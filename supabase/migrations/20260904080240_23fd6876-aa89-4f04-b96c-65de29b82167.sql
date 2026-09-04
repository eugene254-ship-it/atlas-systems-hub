CREATE TYPE public.app_role AS ENUM ('admin','editor');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('admin','editor'))
$$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TABLE public.site_content (
  route_key text PRIMARY KEY,
  label text NOT NULL,
  seo_title text NOT NULL DEFAULT '',
  seo_description text NOT NULL DEFAULT '',
  og_title text NOT NULL DEFAULT '',
  og_description text NOT NULL DEFAULT '',
  fields jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon;
GRANT SELECT, INSERT, UPDATE ON public.site_content TO authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site content is public" ON public.site_content FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "staff update site content" ON public.site_content FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "staff insert site content" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER site_content_updated_at BEFORE UPDATE ON public.site_content FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.site_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff read settings" ON public.site_settings FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "admin write settings" ON public.site_settings FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.rfq_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference text NOT NULL UNIQUE,
  project_name text NOT NULL,
  organization text NOT NULL,
  location text NOT NULL,
  sector text,
  system text,
  scale text,
  requirements text,
  timeline date,
  budget text,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  contact_phone text,
  copilot_brief jsonb,
  source text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.rfq_leads TO authenticated;
GRANT ALL ON public.rfq_leads TO service_role;
ALTER TABLE public.rfq_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff read leads" ON public.rfq_leads FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE POLICY "staff update leads" ON public.rfq_leads FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE TRIGGER rfq_leads_updated_at BEFORE UPDATE ON public.rfq_leads FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE INDEX rfq_leads_created_at_idx ON public.rfq_leads (created_at DESC);

CREATE TABLE public.rfq_lead_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.rfq_leads(id) ON DELETE CASCADE,
  kind text NOT NULL,
  status text NOT NULL,
  detail text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.rfq_lead_events TO authenticated;
GRANT ALL ON public.rfq_lead_events TO service_role;
ALTER TABLE public.rfq_lead_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "staff read lead events" ON public.rfq_lead_events FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE INDEX rfq_lead_events_lead_idx ON public.rfq_lead_events (lead_id, created_at DESC);

INSERT INTO public.site_content (route_key, label, seo_title, seo_description, og_title, og_description, fields) VALUES
('home','Homepage',
 'Atlas Industrial Systems — Modular Industrial Infrastructure',
 'Atlas Industrial Systems engineers, fabricates, deploys and manages modular industrial infrastructure across Africa and beyond.',
 'Atlas Industrial Systems — Industrial Infrastructure, Engineered',
 'Systems engineering, fabrication, deployment and lifecycle management of modular industrial infrastructure.',
 '{"hero_eyebrow":"Atlas Industrial Systems","hero_title":"Industrial infrastructure, engineered as a system.","hero_lead":"AIS designs, fabricates, deploys and operates modular industrial systems — engineered once, standardised, and improved with every deployment.","cta_primary":"Configure a system","cta_secondary":"Start a project"}'::jsonb),
('os','Industrial OS',
 'AIS Industrial OS — Operating Layer for Physical Infrastructure',
 'AIS Industrial OS is the planned software layer connecting assets, projects, manufacturing, logistics, maintenance and industrial intelligence in one operating environment.',
 'AIS Industrial OS — Industrial Operating Environment',
 'Asset command, project control, manufacturing, logistics, maintenance, inventory, performance and intelligence in a single industrial operating layer.',
 '{"hero_eyebrow":"AIS Industrial OS","hero_title":"The operating layer for physical infrastructure.","hero_lead":"Every system AIS engineers, manufactures and deploys is designed to be readable by software: identified, monitored, serviced, upgraded and redeployed across its full life.","status_note":"Platform in development — concept modules"}'::jsonb),
('market','AIS Market',
 'AIS Market — Industrial Modules, Components and Services',
 'AIS Market is the planned industrial marketplace for standardized modules, components, equipment, fabrication, logistics, maintenance and energy systems.',
 'AIS Market — Coming Industrial Marketplace',
 'Discover, configure, request, contract, deploy and manage industrial systems and services through one commercial layer.',
 '{"hero_eyebrow":"AIS Market","hero_title":"A commercial layer for industrial systems.","hero_lead":"A single place to discover standardized industrial systems and the engineering, logistics and lifecycle services that make them work — with pricing, lead times and specifications made legible.","status_note":"Coming platform — not transactable today"}'::jsonb);

INSERT INTO public.site_settings (key, value) VALUES
('rfq_notifications','{"webhook_url":"","notify_email":"","webhook_secret":""}'::jsonb);