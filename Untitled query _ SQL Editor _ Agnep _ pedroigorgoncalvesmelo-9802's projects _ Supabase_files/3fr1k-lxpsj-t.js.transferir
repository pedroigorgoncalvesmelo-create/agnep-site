;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="de6965a1-f714-b8bc-c8a9-924ff9bcb7c9")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,662972,e=>{"use strict";let t=(0,e.i(679709).default)("Clock5",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 14.5 16",key:"1pcbox"}]]);e.s(["Clock5",0,t],662972)},728561,e=>{"use strict";let t=(0,e.i(679709).default)("CodeXml",[["path",{d:"m18 16 4-4-4-4",key:"1inbqp"}],["path",{d:"m6 8-4 4 4 4",key:"15zrgr"}],["path",{d:"m14.5 4-5 16",key:"e7oirm"}]]);e.s(["Code2",0,t],728561)},582968,e=>{"use strict";let t=(0,e.i(679709).default)("Layers",[["path",{d:"m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z",key:"8b97xw"}],["path",{d:"m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65",key:"dd6zsq"}],["path",{d:"m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65",key:"ep9fru"}]]);e.s(["Layers",0,t],582968)},889131,e=>{"use strict";let t=(0,e.i(679709).default)("Vault",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}],["path",{d:"m7.9 7.9 2.7 2.7",key:"hpeyl3"}],["circle",{cx:"16.5",cy:"7.5",r:".5",fill:"currentColor",key:"w0ekpg"}],["path",{d:"m13.4 10.6 2.7-2.7",key:"264c1n"}],["circle",{cx:"7.5",cy:"16.5",r:".5",fill:"currentColor",key:"nkw3mc"}],["path",{d:"m7.9 16.1 2.7-2.7",key:"p81g5e"}],["circle",{cx:"16.5",cy:"16.5",r:".5",fill:"currentColor",key:"fubopw"}],["path",{d:"m13.4 13.4 2.7 2.7",key:"abhel3"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]]);e.s(["Vault",0,t],889131)},866543,e=>{"use strict";let t=(0,e.i(679709).default)("Webhook",[["path",{d:"M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2",key:"q3hayz"}],["path",{d:"m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06",key:"1go1hn"}],["path",{d:"m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8",key:"qlwsc0"}]]);e.s(["Webhook",0,t],866543)},480762,e=>{"use strict";var t=e.i(479084);e.s(["getEnableWebhooksSQL",0,()=>t.safeSql`
BEGIN;
  DO
  $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;
  END
  $$;

  -- Event trigger for pg_net
  CREATE OR REPLACE FUNCTION extensions.grant_pg_net_access()
  RETURNS event_trigger
  LANGUAGE plpgsql
  AS $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM pg_event_trigger_ddl_commands() AS ev
      JOIN pg_extension AS ext
      ON ev.objid = ext.oid
      WHERE ext.extname = 'pg_net'
    )
    THEN
      GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

      IF EXISTS (
        SELECT FROM pg_extension
        WHERE extname = 'pg_net'
        -- all versions in use on existing projects as of 2025-02-20
        -- version 0.12.0 onwards don't need these applied
        AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
      ) THEN
        ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
        ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

        ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
        ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

        REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
        REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

        GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
        GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      END IF;
    END IF;
  END;
  $$;
  COMMENT ON FUNCTION extensions.grant_pg_net_access IS 'Grants access to pg_net';

  DO
  $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_event_trigger
      WHERE evtname = 'issue_pg_net_access'
    ) THEN
      CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end WHEN TAG IN ('CREATE EXTENSION')
      EXECUTE PROCEDURE extensions.grant_pg_net_access();
    END IF;
  END
  $$;

  -- pg_net grants when extension is already enabled
  DO
  $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM pg_extension
      WHERE extname = 'pg_net'
    )
    THEN
      GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

      IF EXISTS (
        SELECT FROM pg_extension
        WHERE extname = 'pg_net'
        -- all versions in use on existing projects as of 2025-02-20
        -- version 0.12.0 onwards don't need these applied
        AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
      ) THEN
        ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
        ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

        ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
        ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

        REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
        REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

        GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
        GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      END IF;
    END IF;
  END
  $$;

  -- Create pg_net extension
  CREATE EXTENSION IF NOT EXISTS pg_net SCHEMA extensions;

  -- Create supabase_functions schema
  CREATE SCHEMA supabase_functions AUTHORIZATION supabase_admin;

  GRANT USAGE ON SCHEMA supabase_functions TO postgres, anon, authenticated, service_role;
  ALTER DEFAULT PRIVILEGES IN SCHEMA supabase_functions GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
  ALTER DEFAULT PRIVILEGES IN SCHEMA supabase_functions GRANT ALL ON FUNCTIONS TO postgres, anon, authenticated, service_role;
  ALTER DEFAULT PRIVILEGES IN SCHEMA supabase_functions GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;

  -- supabase_functions.migrations definition
  CREATE TABLE supabase_functions.migrations (
    version text PRIMARY KEY,
    inserted_at timestamptz NOT NULL DEFAULT NOW()
  );

  -- Initial supabase_functions migration
  INSERT INTO supabase_functions.migrations (version) VALUES ('initial');

  -- supabase_functions.hooks definition
  CREATE TABLE supabase_functions.hooks (
    id bigserial PRIMARY KEY,
    hook_table_id integer NOT NULL,
    hook_name text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    request_id bigint
  );
  CREATE INDEX supabase_functions_hooks_request_id_idx ON supabase_functions.hooks USING btree (request_id);
  CREATE INDEX supabase_functions_hooks_h_table_id_h_name_idx ON supabase_functions.hooks USING btree (hook_table_id, hook_name);
  COMMENT ON TABLE supabase_functions.hooks IS 'Supabase Functions Hooks: Audit trail for triggered hooks.';

  CREATE FUNCTION supabase_functions.http_request()
    RETURNS trigger
    LANGUAGE plpgsql
    AS $function$
    DECLARE
      request_id bigint;
      payload jsonb;
      url text := TG_ARGV[0]::text;
      method text := TG_ARGV[1]::text;
      headers jsonb DEFAULT '{}'::jsonb;
      params jsonb DEFAULT '{}'::jsonb;
      timeout_ms integer DEFAULT 1000;
    BEGIN
      IF url IS NULL OR url = 'null' THEN
        RAISE EXCEPTION 'url argument is missing';
      END IF;

      IF method IS NULL OR method = 'null' THEN
        RAISE EXCEPTION 'method argument is missing';
      END IF;

      IF TG_ARGV[2] IS NULL OR TG_ARGV[2] = 'null' THEN
        headers = '{"Content-Type": "application/json"}'::jsonb;
      ELSE
        headers = TG_ARGV[2]::jsonb;
      END IF;

      IF TG_ARGV[3] IS NULL OR TG_ARGV[3] = 'null' THEN
        params = '{}'::jsonb;
      ELSE
        params = TG_ARGV[3]::jsonb;
      END IF;

      IF TG_ARGV[4] IS NULL OR TG_ARGV[4] = 'null' THEN
        timeout_ms = 1000;
      ELSE
        timeout_ms = TG_ARGV[4]::integer;
      END IF;

      CASE
        WHEN method = 'GET' THEN
          SELECT http_get INTO request_id FROM net.http_get(
            url,
            params,
            headers,
            timeout_ms
          );
        WHEN method = 'POST' THEN
          payload = jsonb_build_object(
            'old_record', OLD,
            'record', NEW,
            'type', TG_OP,
            'table', TG_TABLE_NAME,
            'schema', TG_TABLE_SCHEMA
          );

          SELECT http_post INTO request_id FROM net.http_post(
            url,
            payload,
            params,
            headers,
            timeout_ms
          );
        ELSE
          RAISE EXCEPTION 'method argument % is invalid', method;
      END CASE;

      INSERT INTO supabase_functions.hooks
        (hook_table_id, hook_name, request_id)
      VALUES
        (TG_RELID, TG_NAME, request_id);

      RETURN NEW;
    END
  $function$;

  GRANT ALL PRIVILEGES ON SCHEMA supabase_functions TO supabase_functions_admin;
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA supabase_functions TO supabase_functions_admin;
  GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA supabase_functions TO supabase_functions_admin;
  ALTER USER supabase_functions_admin SET search_path = "supabase_functions";
  ALTER table "supabase_functions".migrations OWNER TO supabase_functions_admin;
  ALTER table "supabase_functions".hooks OWNER TO supabase_functions_admin;
  ALTER function "supabase_functions".http_request() OWNER TO supabase_functions_admin;
  GRANT supabase_functions_admin TO postgres;

  -- Remove unused supabase_pg_net_admin role
  DO
  $$
  BEGIN
    IF EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_pg_net_admin'
    )
    THEN
      REASSIGN OWNED BY supabase_pg_net_admin TO supabase_admin;
      DROP OWNED BY supabase_pg_net_admin;
      DROP ROLE supabase_pg_net_admin;
    END IF;
  END
  $$;

  INSERT INTO supabase_functions.migrations (version) VALUES ('20210809183423_update_grants');

  ALTER function supabase_functions.http_request() SECURITY DEFINER;
  ALTER function supabase_functions.http_request() SET search_path = supabase_functions;
  REVOKE ALL ON FUNCTION supabase_functions.http_request() FROM PUBLIC;
  GRANT EXECUTE ON FUNCTION supabase_functions.http_request() TO postgres, anon, authenticated, service_role;

  COMMIT;
`])},839869,e=>{"use strict";let t=(0,e.i(679709).default)("Timer",[["line",{x1:"10",x2:"14",y1:"2",y2:"2",key:"14vaq8"}],["line",{x1:"12",x2:"15",y1:"14",y2:"11",key:"17fdiu"}],["circle",{cx:"12",cy:"14",r:"8",key:"1e1u0o"}]]);e.s(["Timer",0,t],839869)},933275,297808,232622,e=>{"use strict";var t=e.i(221628);e.i(850036);var a=e.i(480762),s=e.i(662972),n=e.i(728561),i=e.i(582968),r=e.i(839869),o=e.i(889131),l=e.i(866543),u=e.i(524460),c=e.i(707201),d=e.i(843778),p=e.i(108151),g=e.i(640040),m=e.i(837710),h=e.i(911735),_=e.i(450346),E=e.i(635494);let b=({minimumVersion:e="15.6"})=>{let{data:a}=(0,E.useSelectedProjectQuery)();return(0,t.jsxs)(h.Admonition,{type:"default",title:"Database upgrade needed",childProps:{description:{className:"flex flex-col gap-y-2"}},children:[(0,t.jsx)("div",{className:"prose text-sm max-w-full",children:(0,t.jsxs)("p",{children:["This integration requires the ",(0,t.jsx)("code",{children:"pgmq"})," extension which is not available on this version of Postgres. The extension is available on version ",e," and higher."]})}),(0,t.jsx)(m.Button,{color:"primary",className:"w-fit",children:(0,t.jsx)(g.default,{href:(0,_.getServiceVersionsPath)(a?.ref),children:"Upgrade database"})})]})};var f=e.i(559398),y=e.i(615515),T=e.i(918018),S=e.i(705541),v=e.i(964574);e.i(128328);var A=e.i(704206),N=e.i(739114),I=e.i(246230),R=e.i(10429),O=e.i(967052);async function L({projectRef:e,stripeSecretKey:t,startTime:a}){let s=await (0,A.getAccessToken)(),n=await fetch(`${R.BASE_PATH}/api/integrations/stripe-sync`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify({projectRef:e,stripeSecretKey:t,startTime:a})}),i=await n.json();if(!n.ok)throw Error(i.error?.message||"Failed to install Stripe Sync");return i}e.s(["installStripeSync",0,L,"useStripeSyncInstallMutation",0,({onSuccess:e,onError:t,...a}={})=>{let s=(0,v.useQueryClient)(),n=(0,O.useTrack)();return(0,S.useMutation)({mutationFn:e=>L(e),async onSuccess(t,a,i){let{projectRef:r}=a;n("integration_install_submitted",{integrationName:"stripe_sync_engine",method:"template"}),await s.invalidateQueries({queryKey:I.databaseKeys.schemas(r)}),await s.invalidateQueries({queryKey:T.stripeSyncKeys.all}),await e?.(t,a,i)},async onError(e,a,s){void 0===t?N.toast.error(`Failed to install Stripe Sync: ${e.message}`):t(e,a,s)},...a})}],297808);var w=e.i(801834),C=e.i(234745);async function x({ref:e}){let{data:t,error:a}=await (0,C.post)("/platform/database/{ref}/hook-enable",{params:{path:{ref:e}}});return a&&(0,C.handleError)(a),t}e.s(["enableDatabaseWebhooks",0,x,"useHooksEnableMutation",0,({onSuccess:e,onError:t,...a}={})=>{let s=(0,v.useQueryClient)();return(0,S.useMutation)({mutationFn:e=>x(e),async onSuccess(t,a,n){let{ref:i}=a;await e?.(t,a,n),await (0,w.invalidateSchemasQuery)(s,i)},async onError(e,a,s){void 0===t?N.toast.error(`Failed to enable webhooks: ${e.message}`):t(e,a,s)},...a})}],232622);var k=e.i(741391);let j={name:"Supabase",websiteUrl:"https://supabase.com"},G=[{id:"queues",type:"postgres_extension",source:"Community",requiredExtensions:["pgmq"],missingExtensionsAlert:(0,t.jsx)(b,{minimumVersion:"15.6.1.143"}),name:"Queues",icon:({className:e,...a}={})=>(0,t.jsx)(i.Layers,{className:(0,d.cn)("inset-0 p-2 text-black w-full h-full",e),...a}),description:"Lightweight message queue in Postgres",docsUrl:"https://github.com/tembo-io/pgmq",author:{name:"pgmq",websiteUrl:"https://github.com/tembo-io/pgmq"},navigation:[{route:"overview",label:"Overview"},{route:"queues",label:"Queues",hasChild:!0,childIcon:(0,t.jsx)(i.Layers,{size:12,strokeWidth:1.5,className:(0,d.cn)("text-foreground w-full h-full")})},{route:"settings",label:"Settings",layout:"constrained"}],navigate:({pageId:t="overview",childId:a})=>{if(a)return(0,u.default)(()=>e.A(274794).then(e=>e.QueuePage),{loadableGenerated:{modules:[571538]},loading:M});switch(t){case"overview":return(0,u.default)(()=>e.A(909495).then(e=>e.QueuesOverviewTab),{loadableGenerated:{modules:[698380]},loading:M});case"queues":return(0,u.default)(()=>e.A(548863).then(e=>e.QueuesTab),{loadableGenerated:{modules:[79703]},loading:M});case"settings":return(0,u.default)(()=>e.A(283398).then(e=>e.QueuesSettings),{loadableGenerated:{modules:[541970]},loading:M})}return null}},{id:"cron",type:"postgres_extension",source:"Community",requiredExtensions:["pg_cron"],name:"Cron",icon:({className:e,...a}={})=>(0,t.jsx)(s.Clock5,{className:(0,d.cn)("inset-0 p-2 text-black w-full h-full",e),...a}),description:"Schedule recurring Jobs in Postgres",docsUrl:"https://github.com/citusdata/pg_cron",author:{name:"Citus Data",websiteUrl:"https://github.com/citusdata/pg_cron"},navigation:[{route:"overview",label:"Overview"},{route:"jobs",label:"Jobs",hasChild:!0,childIcon:(0,t.jsx)(r.Timer,{size:12,strokeWidth:1.5,className:(0,d.cn)("text-foreground w-full h-full")})}],navigate:({pageId:t="overview",childId:a})=>{if(a)return(0,u.default)(()=>e.A(609157).then(e=>e.CronJobPage),{loadableGenerated:{modules:[323205]},loading:M});switch(t){case"overview":return(0,u.default)(()=>e.A(929825).then(e=>e.CronOverviewTab),{loadableGenerated:{modules:[777403]},loading:M});case"jobs":return(0,u.default)(()=>e.A(579437).then(e=>e.CronjobsTab),{loadableGenerated:{modules:[524943]},loading:M})}return null}},{id:"vault",type:"postgres_extension",source:"Official",requiredExtensions:["supabase_vault"],missingExtensionsAlert:(0,t.jsx)(b,{}),name:"Vault",status:"beta",icon:({className:e,...a}={})=>(0,t.jsx)(o.Vault,{className:(0,d.cn)("inset-0 p-2 text-black w-full h-full",e),...a}),description:"Application level encryption for your project",docsUrl:`${R.DOCS_URL}/guides/database/vault`,author:j,navigation:[{route:"overview",label:"Overview"},{route:"secrets",label:"Secrets"}],navigate:({pageId:t="overview"})=>{switch(t){case"overview":return(0,u.default)(()=>e.A(150116).then(e=>e.VaultOverviewTab),{loadableGenerated:{modules:[763645]},loading:M});case"secrets":return(0,u.default)(()=>e.A(707643).then(e=>e.SecretsManagement),{loadableGenerated:{modules:[935100]},loading:M})}return null}},{id:"webhooks",type:"postgres_extension",source:"Official",name:"Database Webhooks",icon:({className:e,...a}={})=>(0,t.jsx)(l.Webhook,{className:(0,d.cn)("inset-0 p-2 text-black w-full h-full",e),...a}),description:"Send real-time data from your database to another system when a table event occurs",docsUrl:`${R.DOCS_URL}/guides/database/webhooks`,author:j,requiredExtensions:["pg_net"],navigation:[{route:"overview",label:"Overview"},{route:"webhooks",label:"Webhooks",layout:"constrained"}],navigate:({pageId:t="overview"})=>{switch(t){case"overview":return(0,u.default)(()=>e.A(467186).then(e=>e.WebhooksOverviewTab),{loadableGenerated:{modules:[6777]},loading:M});case"webhooks":return(0,u.default)(()=>e.A(639206).then(e=>e.WebhooksListTab),{loadableGenerated:{modules:[791713]},loading:M})}return null},installationSql:(0,a.getEnableWebhooksSQL)(),installationCommand:async({ref:e})=>{let t=(0,k.getQueryClient)();await x({ref:e}),await (0,w.invalidateSchemasQuery)(t,e)}},{id:"data_api",type:"custom",source:"Official",requiredExtensions:[],name:"Data API",icon:({className:e,...a}={})=>(0,t.jsx)(n.Code2,{className:(0,d.cn)("inset-0 p-2 text-black w-full h-full",e),...a}),description:"Auto-generate an API directly from your database schema",docsUrl:`${R.DOCS_URL}/guides/api`,author:j,navigation:[{route:"overview",label:"Overview"},{route:"settings",label:"Settings",layout:"constrained"},{route:"docs",label:"Docs"}],navigate:({pageId:t="overview"})=>{switch(t){case"overview":return(0,u.default)(()=>e.A(250577).then(e=>e.DataApiOverviewTab),{loadableGenerated:{modules:[429091]},loading:M});case"settings":return(0,u.default)(()=>e.A(610764).then(e=>e.DataApiSettingsTab),{loadableGenerated:{modules:[247311]},loading:M});case"docs":return(0,u.default)(()=>e.A(818633).then(e=>e.DataApiDocsTab),{loadableGenerated:{modules:[338481]},loading:M})}return null}},{id:"graphiql",type:"postgres_extension",source:"Official",requiredExtensions:["pg_graphql"],name:"GraphQL",icon:({className:e,...a}={})=>(0,t.jsx)(c.default,{fill:!0,src:`${R.BASE_PATH}/img/graphql.svg`,alt:"GraphiQL",className:(0,d.cn)("p-2",e),...a}),description:"Run GraphQL queries through our interactive in-browser IDE",docsUrl:`${R.DOCS_URL}/guides/database/extensions/pg_graphql`,author:j,navigation:[{route:"overview",label:"Overview"},{route:"graphiql",label:"GraphiQL"}],navigate:({pageId:t="overview"})=>{switch(t){case"overview":return(0,u.default)(()=>e.A(859528).then(e=>e.GraphQLOverviewTab),{loadableGenerated:{modules:[372475]},loading:M});case"graphiql":return(0,u.default)(()=>e.A(500556).then(e=>e.GraphiQLTab),{loadableGenerated:{modules:[321608]},loading:M})}return null}}],F=y.WRAPPERS.map(a=>({id:a.name,type:"wrapper",source:"Official",name:`${a.label} Wrapper`,icon:({className:e,...s}={})=>(0,t.jsx)(c.default,{fill:!0,src:a.icon,alt:a.name,className:(0,d.cn)("p-2",e),...s}),requiredExtensions:["wrappers","supabase_vault"],description:a.description,docsUrl:a.docsUrl,categories:a.categories,meta:a,author:j,navigation:[{route:"overview",label:"Overview"},{route:"wrappers",label:"Wrappers"}],navigate:({pageId:t="overview"})=>{switch(t){case"overview":return(0,u.default)(()=>e.A(596207).then(e=>e.WrapperOverviewTab),{loadableGenerated:{modules:[865243]},loading:M});case"wrappers":return(0,u.default)(()=>e.A(354946).then(e=>e.WrappersTab),{loadableGenerated:{modules:[674412]},loading:M})}return null}})),P=[{id:"stripe_sync_engine",type:"template",source:"Partner",requiredExtensions:["pgmq","supabase_vault","pg_cron","pg_net"],missingExtensionsAlert:(0,t.jsx)(b,{minimumVersion:"15.6.1.143"}),name:"Stripe Sync Engine",status:"alpha",icon:({className:e,...a}={})=>(0,t.jsx)(c.default,{fill:!0,src:`${R.BASE_PATH}/img/icons/stripe-icon.svg`,alt:"Stripe Logo",className:(0,d.cn)("p-2",e),...a}),description:"Continuously sync your payments, customer, and other data from Stripe to your Postgres database",docsUrl:"https://github.com/stripe-experiments/sync-engine/",author:{name:"Stripe",websiteUrl:"https://www.stripe.com"},navigation:[{route:"overview",label:"Overview"},{route:"settings",label:"Settings",layout:"constrained"}],navigate:({pageId:t="overview"})=>{switch(t){case"overview":return(0,u.default)(()=>e.A(943222).then(e=>e.StripeSyncEngineOverviewTab),{loadableGenerated:{modules:[140017]},loading:M});case"settings":return(0,u.default)(()=>e.A(98740).then(e=>e.StripeSyncSettingsPage),{loadableGenerated:{modules:[795776]},loading:M})}return null},inputs:{stripe_api_key:{type:"password",required:!0,label:"Stripe API secret key",description:"Requires write access to Webhook Endpoints and read-only access to all other categories.",actions:[{label:"Get API key",href:"https://dashboard.stripe.com/apikeys"},{label:"What are Stripe API keys?",href:"https://support.stripe.com/questions/what-are-stripe-api-keys-and-how-to-find-them"}]}},steps:[{label:"Creates a new database schema named `stripe`"},{label:"Creates tables and views in the `stripe` schema for synced Stripe data"},{label:"Deploys Edge Functions to handle incoming webhooks from Stripe"},{label:"Schedules automatic Stripe data syncs using Supabase Queues"}],installationCommand:async({ref:e,track:t,stripe_api_key:a})=>{let s=Date.now();await L({projectRef:e,startTime:s,stripeSecretKey:a}),t&&t("integration_install_submitted",{integrationName:"stripe_sync_engine",method:"template"});let n=(0,k.getQueryClient)();await n.invalidateQueries({queryKey:T.stripeSyncKeys.all})},checkInstallationStatus:async e=>{let t=(0,k.getQueryClient)(),{projectRef:a,connectionString:s}=e||{},n=await (0,w.getSchemas)({projectRef:a,connectionString:s}),{status:i,errorMessage:r}=(0,f.getStripeSyncSchemaComment)(n);if("install error"===i)throw Error(r??"Stripe Sync installation failed");return"installed"===i&&await t.invalidateQueries({queryKey:I.databaseKeys.schemas(a)}),"installed"===i?"installed":"installing"}}],U=[...F,...G.map(e=>({...e,categories:({queues:["devtools"],cron:["devtools"],vault:["security"],webhooks:["api"],data_api:["api","data-platform"],graphiql:["api","devtools"]})[e.id]||[]})),...P.map(e=>({...e,categories:({stripe_sync_engine:["billing"]})[e.id]||[]}))],M=()=>(0,t.jsx)("div",{className:"p-10",children:(0,t.jsx)(p.GenericSkeletonLoader,{})});e.s(["INTEGRATIONS",0,U,"Loading",0,M],933275)},309140,e=>{"use strict";var t=e.i(125356),a=e.i(255392),s=e.i(234745);async function n({projectRef:e},t){if(!e)throw Error("Project ref is required");let{data:a,error:i}=await (0,s.get)("/platform/integrations/partners/{ref}",{params:{path:{ref:e}},signal:t});return i&&(0,s.handleError)(i),a.integrations}e.s(["usePartnerIntegrationsQuery",0,({projectRef:e},{enabled:s=!0,...i}={})=>(0,t.useQuery)({queryKey:a.partnersKeys.getIntegrations(e),queryFn:({signal:t})=>n({projectRef:e},t),enabled:s&&void 0!==e,...i})])},481943,e=>{"use strict";e.s(["secretsKeys",0,{list:e=>["projects",e,"edge_functions_secrets"]}])},230833,e=>{"use strict";var t=e.i(125356),a=e.i(481943),s=e.i(234745);async function n({projectRef:e},t){if(!e)throw Error("Project ref is required");let{data:a,error:i}=await (0,s.get)("/v1/projects/{ref}/secrets",{params:{path:{ref:e}},signal:t});return i&&(0,s.handleError)(i),a}e.s(["useSecretsQuery",0,({projectRef:e},{enabled:s=!0,...i}={})=>(0,t.useQuery)({queryKey:a.secretsKeys.list(e),queryFn:({signal:t})=>n({projectRef:e},t),enabled:s&&void 0!==e,...i})])},26760,e=>{"use strict";e.i(766590);var t=e.i(398734),a=e.i(452239),s=e.i(416340),n=e.i(12214),i=e.i(427459),r=e.i(108892),o=e.i(14703),l=e.i(656429),u=e.i(309140),c=e.i(230833),d=e.i(2579),p=e.i(265735),g=e.i(237948);let m=e=>e instanceof g.ResponseError&&403===e.code;function h(e,t,a){return m(t)?a:e??a}let _=(e,t)=>e.partnerIntegrations.some(e=>e.listing_slug===t.id&&"ready"===e.status),E=(e,t)=>!!t.oauthAppId&&e.oauthApps.some(e=>e.app_id===t.oauthAppId),b=(e,t)=>!!t&&e.apiKeys.some(e=>"secret"===e.type&&e.name.startsWith(t)),f=(e,t)=>!!t&&e.edgeFunctionSecrets.some(e=>e.name===t),y={grafana:{secretKeyPrefix:"grafana_cloud_integration_",usage:{oauth_app:{description:"Grants Grafana access to your organization so it can discover projects to monitor."},api_key:{description:"Grafana uses this secret API key to read your project metrics from the Prometheus-compatible metrics endpoint.",removalWarning:"Removing this key stops Grafana from collecting metrics from your project until a new key is connected.",noteWhenAbsent:"No secret API key is connected for Grafana to read your project metrics. Dashboards will not receive data without one."}}},doppler:{edgeFunctionSecretName:"DOPPLER_CONFIG",usage:{oauth_app:{description:"Grants Doppler access to your organization so it can update secrets in your projects.",noteWhenAbsent:"Doppler does not have access to update secrets in your project. Any changes you make to secrets in Doppler will not be reflected in your project until access is granted."},edge_function_secret:{description:"Doppler syncs your managed secrets into this Edge Function secret so they are available to your functions at runtime.",removalWarning:"Connected secrets that are removed while this integration is active may be resynced if still present in Doppler.",noteWhenAbsent:"No Edge Function secrets were found connected to this integration."}}},resend:{resendSmtp:!0,usage:{oauth_app:{description:"Grants Resend access to manage the custom SMTP configuration used to send your project emails."},smtp:{description:"Resend is configured as the custom SMTP relay your project uses to deliver authentication and transactional emails.",noteWhenAbsent:"SMTP settings for Resend were not detected. Authentication emails may not be sent through Resend's SMTP service."}}}};e.s(["getConnectedResourceUsage",0,(e,t)=>y[e]?.usage?.[t],"getConnectedResources",0,({integration:e,projectData:t})=>{let a=y[e.id]??{},s=[];if(e.oauthAppId){let a=t.oauthApps.find(t=>t.app_id===e.oauthAppId);a&&s.push({kind:"oauth_app",key:`oauth_app:${a.id}`,title:"OAuth application",description:`Grants ${e.name} access to your organization and its projects.`,app:a})}let n=a.secretKeyPrefix??e.secretKeyPrefix;n&&t.apiKeys.filter(e=>"secret"===e.type&&e.name.startsWith(n)).forEach(e=>{s.push({kind:"api_key",key:`api_key:${e.id}`,title:"Secret API key",description:e.name,apiKey:e})});let i=a.edgeFunctionSecretName??e.edgeFunctionSecretName;if(i){let e=t.edgeFunctionSecrets.find(e=>e.name===i);e&&s.push({kind:"edge_function_secret",key:`edge_function_secret:${e.name}`,title:"Edge Function secret",description:e.name,secret:e})}return a.resendSmtp&&t.authConfig?.SMTP_HOST==="smtp.resend.com"&&s.push({kind:"smtp",key:"smtp",title:"SMTP settings",description:`Custom SMTP relay configured to send project emails through ${e.name}.`}),s},"getExpectedResourceKinds",0,e=>{let t=y[e.id]??{},a=[];return e.oauthAppId&&a.push("oauth_app"),(t.secretKeyPrefix??e.secretKeyPrefix)&&a.push("api_key"),(t.edgeFunctionSecretName??e.edgeFunctionSecretName)&&a.push("edge_function_secret"),t.resendSmtp&&a.push("smtp"),a},"hasMatchingWrapper",0,({meta:e,wrappers:t})=>t.find(t=>(0,n.wrapperMetaComparator)(e,t)),"hasRequiredExtensions",0,({integration:e,extensions:t})=>e.requiredExtensions.every(e=>{let a=t.find(t=>t.name===e);return!!a?.installed_version}),"isOAuthInstalled",0,({integration:e,projectData:t})=>"resend"===e.id?t.authConfig?.SMTP_HOST==="smtp.resend.com"&&E(t,e):"grafana"===e.id||"grafana-cloud"===e.id?E(t,e)||b(t,"grafana_cloud_integration_"):"aikido"===e.id?E(t,e):"doppler"===e.id?E(t,e)||f(t,"DOPPLER_CONFIG")||_(t,e):"integration_status"===e.installIdentificationMethod?_(t,e):"oauth_authorization"===e.installIdentificationMethod?E(t,e):"secret_key_prefix"===e.installIdentificationMethod?b(t,e.secretKeyPrefix):"edge_function_secret_name"===e.installIdentificationMethod&&f(t,e.edgeFunctionSecretName),"isStripeSyncEngineInstalled",0,e=>{let a=(0,i.findStripeSchema)(e),s=(0,t.parseSchemaComment)(a?.comment);return(0,i.isInstalled)(s.status)},"useProjectOAuthIntegrationData",0,(e,{enabled:t=!0}={})=>{let{data:n}=(0,p.useSelectedOrganizationQuery)({enabled:t}),{can:i}=(0,d.useAsyncCheckPermissions)(a.PermissionAction.READ,"oauth_apps",void 0,{organizationSlug:n?.slug,projectRef:null}),g={enabled:t,retryOnMount:!1},_={apiKeys:(0,r.useAPIKeysQuery)({projectRef:e,reveal:!1},g),edgeFunctionSecrets:(0,c.useSecretsQuery)({projectRef:e},g),authConfig:(0,o.useAuthConfigQuery)({projectRef:e},g),partnerIntegrations:(0,u.usePartnerIntegrationsQuery)({projectRef:e},g),oauthApps:(0,l.useAuthorizedAppsQuery)({slug:n?.slug},{...g,enabled:i&&t&&!!n})},E=(0,s.useMemo)(()=>({apiKeys:h(_.apiKeys.data,_.apiKeys.error,[]),edgeFunctionSecrets:h(_.edgeFunctionSecrets.data,_.edgeFunctionSecrets.error,[]),authConfig:h(_.authConfig.data,_.authConfig.error,null),partnerIntegrations:h(_.partnerIntegrations.data,_.partnerIntegrations.error,[]),oauthApps:h(_.oauthApps.data,_.oauthApps.error,[])}),[_.apiKeys.data,_.apiKeys.error,_.edgeFunctionSecrets.data,_.edgeFunctionSecrets.error,_.authConfig.data,_.authConfig.error,_.partnerIntegrations.data,_.partnerIntegrations.error,_.oauthApps.data,_.oauthApps.error]),b=Object.values(_),f=b.map(e=>e.error).filter(e=>!!e&&!m(e));return{data:E,error:f[0]??null,isError:f.length>0,isLoading:b.some(e=>e.isLoading),isPending:b.some(e=>e.isPending),isSuccess:b.every(e=>e.isSuccess||m(e.error))}}])},757670,e=>{"use strict";var t=e.i(517778);e.s(["createMarketplaceClient",0,()=>(0,t.createClient)("https://otqhrpbxhxkrhrnjqbba.supabase.co","sb_publishable_ZVVKKu1s88KsSBWVYlou-g_phb2OJVQ",{auth:{persistSession:!1,autoRefreshToken:!1,detectSessionInUrl:!1,storage:{getItem:e=>null,setItem:(e,t)=>{},removeItem:e=>{}}}}),"fullImageUrl",0,e=>`https://otqhrpbxhxkrhrnjqbba.supabase.co${e}`])},79745,353917,462531,e=>{"use strict";var t=e.i(221628);e.i(128328);var a=e.i(657588),s=e.i(86086),n=e.i(757670),i=e.i(469099),r=e.i(524460),o=e.i(707201),l=e.i(416340),u=e.i(843778),c=e.i(933275),d=e.i(463333),p=e.i(125356);let g={list:()=>["marketplace","integrations"],categories:()=>["marketplace","categories"]};e.s(["marketplaceIntegrationsKeys",0,g],353917);var m=e.i(234745);async function h(e){let t=(0,n.createMarketplaceClient)().from("marketplace_listings").select("*").not("published_in_marketplace_at","is",null);e&&(t=t.abortSignal(e));let{data:a,error:s}=await t;return s&&(0,m.handleError)(s),a??[]}let _=({enabled:e=!0,...t}={})=>(0,p.useQuery)({queryKey:g.list(),queryFn:({signal:e})=>h(e),enabled:e,...t});e.s(["useMarketplaceIntegrationsQuery",0,_],462531);var E=e.i(375890),b=e.i(912793);let f=e=>({className:a,...s}={})=>(0,t.jsx)("div",{className:"relative w-full h-full",children:e?(0,t.jsx)(o.default,{fill:!0,src:(0,n.fullImageUrl)(e),alt:"",className:(0,u.cn)("p-2",a),...s}):(0,t.jsx)(i.Boxes,{className:(0,u.cn)("inset-0 p-2 text-black w-full h-full",a),...s})});function y(e){return e.categories.some(e=>e?.slug==="foreign-data-wrapper")}e.s(["useAvailableIntegrations",0,()=>{let{integrationsWrappers:t}=(0,b.useIsFeatureEnabled)(["integrations:wrappers"]),{data:i}=(0,E.useCLIReleaseVersionQuery)(),o=!!i?.current,{isPending:u,isSuccess:p,isError:g,data:m,error:h}=(()=>{let{hasLoaded:e}=(0,l.useContext)(a.FeatureFlagContext),t=(0,d.useIsMarketplaceEnabled)(),{data:n,error:i}=_({enabled:t}),r=s.IS_PLATFORM&&(!e||t&&!n&&!i),o=!s.IS_PLATFORM||e&&(!t||!!n&&!i),u=s.IS_PLATFORM&&t&&!!i,c=(0,a.useFlag)("previewMarketplaceListingsEnabled"),p=(0,a.useFeatureFlags)();return{isPending:r,isSuccess:o,isError:u,data:(0,l.useMemo)(()=>(n??[]).filter(e=>{var t;let a;return"approved"===e.review_status||"preview"===e.review_status&&(c||(t=e.slug,a=`${t}DashboardIntegrationEnabled`,p.configcat[a]??!1))}),[n,c,p]),error:i}})(),T=(0,l.useMemo)(()=>m.filter(e=>!y(e)).map(t=>{let{id:a,slug:s,categories:i,featured:o,title:l,description:u,documentation_url:d,website_url:p,installation_url:g,installation_url_type:m,installation_identification_method:h,secret_key_prefix:_,edge_function_secret_name:E,images:b,content:y,built_by:T,listing_logo:S,oauth_app_id:v}=t;return{id:s??"",name:l??"",status:void 0,featured:!!o,type:"oauth",source:"Partner",categories:i.map(e=>e.slug),content:y,files:b?.map((e,t)=>({src:(0,n.fullImageUrl)(e),alt:`${l} image ${t+1}`})),description:u,docsUrl:d,siteUrl:p,installUrl:g,installUrlType:m??void 0,installIdentificationMethod:h??void 0,secretKeyPrefix:_??void 0,edgeFunctionSecretName:E??void 0,oauthAppId:v??void 0,listingId:a??void 0,author:{name:T??"",websiteUrl:""},requiredExtensions:[],icon:f(S),navigation:[{route:"overview",label:"Overview"},{route:"settings",label:"Settings",layout:"constrained"}],navigate:({pageId:t="overview"})=>{switch(t){case"overview":return(0,r.default)(()=>e.A(130281).then(e=>e.MarketplaceIntegrationOverviewTab),{loadableGenerated:{modules:[10338]},loading:c.Loading});case"settings":return(0,r.default)(()=>e.A(655992).then(e=>e.MarketplaceIntegrationSettingsTab),{loadableGenerated:{modules:[614956]},loading:c.Loading})}return null}}}),[m]),S=(0,l.useMemo)(()=>{let e={};return m.forEach(t=>{y(t)&&(e[t.slug.replaceAll("-","_")]=t)}),e},[m]),v=(0,l.useMemo)(()=>c.INTEGRATIONS.filter(e=>(!!t||"wrapper"!==e.type)&&("stripe_sync_engine"!==e.id||!o)).map(e=>{if("wrapper"!==e.type)return e;let t=S[e.id];if(!t)return e;let{title:a,description:s,content:i,documentation_url:r,website_url:o,images:l,built_by:u,listing_logo:c}=t,d={name:a,description:s,content:i,docsUrl:r,siteUrl:o,author:u?{name:u,websiteUrl:""}:void 0,files:l?.map((e,t)=>({src:(0,n.fullImageUrl)(e),alt:`${a} screenshot ${t+1}`})),icon:c?f(c):void 0};return{...e,...Object.fromEntries(Object.entries(d).filter(([,e])=>null!=e))}}),[t,o,S]);return{data:(0,l.useMemo)(()=>[...T,...v].sort((e,t)=>e.name.localeCompare(t.name)),[T,v]),error:h,isPending:u,isSuccess:p,isError:g}}],79745)},400104,e=>{"use strict";var t=e.i(452239),a=e.i(416340),s=e.i(26760),n=e.i(79745),i=e.i(450972),r=e.i(801834),o=e.i(298625),l=e.i(2579),u=e.i(265735),c=e.i(635494),d=e.i(681328);e.s(["useInstalledIntegrations",0,()=>{let{data:e}=(0,c.useSelectedProjectQuery)(),{data:p}=(0,u.useSelectedOrganizationQuery)(),{can:g}=(0,l.useAsyncCheckPermissions)(t.PermissionAction.READ,"oauth_apps",void 0,{organizationSlug:p?.slug,projectRef:null}),{data:m=d.EMPTY_ARR,error:h,isPending:_,isSuccess:E,isError:b}=(0,n.useAvailableIntegrations)(),f=(0,a.useMemo)(()=>m.some(e=>"oauth"===e.type),[m]),{data:y,error:T,isError:S,isLoading:v,isSuccess:A}=(0,s.useProjectOAuthIntegrationData)(e?.ref,{enabled:f}),{data:N=d.EMPTY_ARR,error:I,isError:R,isPending:O,isSuccess:L}=(0,o.useFDWsQuery)({projectRef:e?.ref,connectionString:e?.connectionString}),{data:w=d.EMPTY_ARR,error:C,isError:x,isPending:k,isSuccess:j}=(0,i.useDatabaseExtensionsQuery)({projectRef:e?.ref,connectionString:e?.connectionString}),{data:G=d.EMPTY_ARR,error:F,isError:P,isPending:U,isSuccess:M}=(0,r.useSchemasQuery)({projectRef:e?.ref,connectionString:e?.connectionString}),D=G.some(e=>"supabase_functions"===e.name),q=(0,a.useMemo)(()=>m.filter(e=>"webhooks"===e.id?D:"data_api"===e.id||("stripe_sync_engine"===e.id?(0,s.isStripeSyncEngineInstalled)(G):"wrapper"===e.type?(0,s.hasMatchingWrapper)({meta:e.meta,wrappers:N}):"postgres_extension"===e.type?(0,s.hasRequiredExtensions)({integration:e,extensions:w}):"oauth"===e.type&&(0,s.isOAuthInstalled)({integration:e,projectData:y}))).sort((e,t)=>e.name.localeCompare(t.name)),[m,N,w,G,D,y]),W=I||C||F||h||(g&&f?T:null),Q=U||O||k||_||f&&g&&v,$=R||x||P||b||f&&g&&S,H=L&&j&&M&&E&&(!f||!g||A);return{installedIntegrations:Q?d.EMPTY_ARR:q,error:W,isError:$,isLoading:Q,isSuccess:H}}])}]);

//# debugId=de6965a1-f714-b8bc-c8a9-924ff9bcb7c9