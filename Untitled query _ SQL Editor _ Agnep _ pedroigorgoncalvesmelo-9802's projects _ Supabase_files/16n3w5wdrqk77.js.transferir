;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="2d12c2d6-cb77-8fd5-7779-08f5f85cb79b")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,993394,e=>{"use strict";e.i(128328);var t,s=e.i(86086),r=e.i(55956),a=e.i(562616),i=e.i(10429);let o=`${i.DOCS_URL}/guides/platform/logs#querying-with-the-logs-explorer`,n=[{label:"Recent Errors",mode:"simple",searchString:"[Ee]rror|\\s[45][0-9][0-9]\\s",for:["api"]},{label:"Commits",mode:"simple",searchString:"COMMIT",for:["database"]},{label:"Commits By User",description:"Count of commits made by users on the database",mode:"custom",searchString:`select
  p.user_name,
  count(*) as count
from postgres_logs
  left join unnest(metadata) as m on true
  left join unnest(m.parsed) as p on true
where
  regexp_contains(event_message, 'COMMIT')
group by
  p.user_name
  `,for:["database"]},{label:"Metadata IP",description:"List all IP addresses that used the Supabase API",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  h.x_real_ip
from edge_logs
  left join unnest(metadata) as m on true
  left join unnest(m.request) as r on true
  left join unnest(r.headers) as h on true
where h.x_real_ip is not null
`,for:["api"]},{label:"Requests by Geography",description:"List all ISO 3166-1 alpha-2 country codes that used the Supabase API",mode:"custom",searchString:`select
  cf.country,
  count(*) as count
from edge_logs
  left join unnest(metadata) as m on true
  left join unnest(m.request) as r on true
  left join unnest(r.cf) as cf on true
group by
  cf.country
order by
  count desc
`,for:["api"]},{label:"Slow Response Time",mode:"custom",description:"List all Supabase API requests that are slow",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message,
  r.origin_time
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.response) as r
where
  r.origin_time > 1000
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"500 Request Codes",description:"List all Supabase API requests that responded witha 5XX status code",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message,
  r.status_code
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.response) as r
where
  r.status_code >= 500
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"Top Paths",description:"List the most requested Supabase API paths",mode:"custom",searchString:`select
  r.path as path,
  r.search as params,
  count(timestamp) as c
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) as r
group by
  path,
  params
order by
  c desc
limit 100
`,for:["api"]},{label:"REST Requests",description:"List all PostgREST requests",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) as r
where
  path like '%rest/v1%'
order by
  timestamp desc
limit 100
`,for:["api"]},{label:"Errors",description:"List all Postgres error messages with ERROR, FATAL, or PANIC severity",mode:"custom",searchString:`select
  cast(t.timestamp as datetime) as timestamp,
  p.error_severity,
  event_message
from postgres_logs as t
  cross join unnest(metadata) as m
  cross join unnest(m.parsed) as p
where
  p.error_severity in ('ERROR', 'FATAL', 'PANIC')
order by
  timestamp desc
limit 100
`,for:["database"]},{label:"Error Count by User",description:"Count of errors by users",mode:"custom",searchString:`select
  count(t.timestamp) as count,
  p.user_name,
  p.error_severity
from postgres_logs as t
  cross join unnest(metadata) as m
  cross join unnest(m.parsed) as p
where
  p.error_severity in ('ERROR', 'FATAL', 'PANIC')
group by
  p.user_name,
  p.error_severity
order by
  count desc
limit 100
`,for:["database"]},{label:"Auth Endpoint Events",description:"Endpoint events filtered by path",mode:"custom",searchString:`select
  t.timestamp,
  event_message
from auth_logs as t
where
  regexp_contains(event_message,"level.{3}(info|warning||error|fatal)")
  -- and regexp_contains(event_message,"path.{3}(/token|/recover|/signup|/otp)")
limit 100
`,for:["database"]},{label:"Auth Audit Logs",description:"Audit logs for auth events",mode:"custom",searchString:`select
  cast(timestamp as datetime) as timestamp,
  event_message, metadata 
from auth_audit_logs 
limit 10
`,for:["database"]},{label:"Storage Object Requests",description:"Number of requests done on Storage Objects",mode:"custom",searchString:`select
  r.method as http_verb,
  r.path as filepath,
  count(*) as num_requests
from edge_logs
  cross join unnest(metadata) as m
  cross join unnest(m.request) AS r
  cross join unnest(r.headers) AS h
where
  path like '%storage/v1/object/%'
group by
  r.path, r.method
order by
  num_requests desc
limit 100
`,for:["api"]},{label:"Storage Egress Requests",description:"Check the number of requests done on Storage Affecting Egress",mode:"custom",searchString:`select
  request.method as http_verb,
  request.path as filepath,
  (responseHeaders.cf_cache_status = 'HIT') as cached,
  count(*) as num_requests
from
  edge_logs
  cross join unnest(metadata) as metadata
  cross join unnest(metadata.request) as request
  cross join unnest(metadata.response) as response
  cross join unnest(response.headers) as responseHeaders
where
  (path like '%storage/v1/object/%' or path like '%storage/v1/render/%')
  and request.method = 'GET'
group by 1, 2, 3
order by num_requests desc
limit 100;
`,for:["api"]},{label:"Storage Top Cache Misses",description:"The top Storage requests that miss caching",mode:"custom",searchString:`select
  r.path as path,
  r.search as search,
  count(id) as count
from edge_logs f
  cross join unnest(f.metadata) as m
  cross join unnest(m.request) as r
  cross join unnest(m.response) as res
  cross join unnest(res.headers) as h
where starts_with(r.path, '/storage/v1/object')
  and r.method = 'GET'
  and h.cf_cache_status in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC')
group by path, search
order by count desc
limit 100;
`,for:["api"]}],l={"Commits By User":`select
  log_attributes['parsed.user_name'] as user_name,
  count() as count
from logs
where source = 'postgres_logs'
  and event_message like '%COMMIT%'
group by user_name
order by count desc
limit 100`,"Metadata IP":`select
  timestamp,
  log_attributes['request.headers.x_real_ip'] as x_real_ip
from logs
where source = 'edge_logs'
  and log_attributes['request.headers.x_real_ip'] != ''
order by timestamp desc
limit 100`,"Requests by Geography":`select
  log_attributes['request.cf.country'] as country,
  count() as count
from logs
where source = 'edge_logs'
group by country
order by count desc
limit 100`,"Slow Response Time":`select
  timestamp,
  event_message,
  toInt32OrZero(log_attributes['response.origin_time']) as origin_time
from logs
where source = 'edge_logs'
  and toInt32OrZero(log_attributes['response.origin_time']) > 1000
order by timestamp desc
limit 100`,"500 Request Codes":`select
  timestamp,
  event_message,
  toInt32OrZero(log_attributes['response.status_code']) as status_code
from logs
where source = 'edge_logs'
  and toInt32OrZero(log_attributes['response.status_code']) >= 500
order by timestamp desc
limit 100`,"Top Paths":`select
  log_attributes['request.path'] as path,
  log_attributes['request.search'] as params,
  count() as c
from logs
where source = 'edge_logs'
group by path, params
order by c desc
limit 100`,"REST Requests":`select
  timestamp,
  event_message
from logs
where source = 'edge_logs'
  and log_attributes['request.path'] like '%rest/v1%'
order by timestamp desc
limit 100`,Errors:`select
  timestamp,
  log_attributes['parsed.error_severity'] as error_severity,
  event_message
from logs
where source = 'postgres_logs'
  and log_attributes['parsed.error_severity'] in ('ERROR', 'FATAL', 'PANIC')
order by timestamp desc
limit 100`,"Error Count by User":`select
  count() as count,
  log_attributes['parsed.user_name'] as user_name,
  log_attributes['parsed.error_severity'] as error_severity
from logs
where source = 'postgres_logs'
  and log_attributes['parsed.error_severity'] in ('ERROR', 'FATAL', 'PANIC')
group by user_name, error_severity
order by count desc
limit 100`,"Auth Endpoint Events":`select
  timestamp,
  event_message
from logs
where source = 'auth_logs'
  and match(event_message, 'level.{3}(info|warning|error|fatal)')
order by timestamp desc
limit 100`,"Auth Audit Logs":`select
  timestamp,
  event_message,
  log_attributes
from logs
where source = 'auth_audit_logs'
order by timestamp desc
limit 10`,"Storage Object Requests":`select
  log_attributes['request.method'] as http_verb,
  log_attributes['request.path'] as filepath,
  count() as num_requests
from logs
where source = 'edge_logs'
  and log_attributes['request.path'] like '%storage/v1/object/%'
group by http_verb, filepath
order by num_requests desc
limit 100`,"Storage Egress Requests":`select
  log_attributes['request.method'] as http_verb,
  log_attributes['request.path'] as filepath,
  (log_attributes['response.headers.cf_cache_status'] = 'HIT') as cached,
  count() as num_requests
from logs
where source = 'edge_logs'
  and (
    log_attributes['request.path'] like '%storage/v1/object/%'
    or log_attributes['request.path'] like '%storage/v1/render/%'
  )
  and log_attributes['request.method'] = 'GET'
group by http_verb, filepath, cached
order by num_requests desc
limit 100`,"Storage Top Cache Misses":`select
  log_attributes['request.path'] as path,
  log_attributes['request.search'] as search,
  count() as count
from logs
where source = 'edge_logs'
  and startsWith(log_attributes['request.path'], '/storage/v1/object')
  and log_attributes['request.method'] = 'GET'
  and log_attributes['response.headers.cf_cache_status'] in ('MISS', 'NONE/UNKNOWN', 'EXPIRED', 'BYPASS', 'DYNAMIC')
group by path, search
order by count desc
limit 100`},u={search_query:e=>a.safeSql`regexp_contains(event_message, ${(0,a.analyticsLiteral)(e)})`},c=a.safeSql`IFNULL(metadata.level, '') IN ('error', 'fatal') OR IFNULL(SAFE_CAST(metadata.status AS INT64), 0) >= 500`,d=a.safeSql`IFNULL(metadata.level, '') = 'warning' OR IFNULL(SAFE_CAST(metadata.status AS INT64), 0) BETWEEN 400 AND 499`,g=a.safeSql`NOT (${c}) AND NOT (${d})`,h={postgres_logs:{...u,database:e=>a.safeSql`identifier = ${(0,a.analyticsLiteral)(e)}`,"severity.error":a.safeSql`parsed.error_severity in ('ERROR', 'FATAL', 'PANIC')`,"severity.noError":a.safeSql`parsed.error_severity not in ('ERROR', 'FATAL', 'PANIC')`,"severity.log":a.safeSql`parsed.error_severity = 'LOG'`},edge_logs:{...u,database:e=>a.safeSql`identifier = ${(0,a.analyticsLiteral)(e)}`,"status_code.error":a.safeSql`response.status_code between 500 and 599`,"status_code.success":a.safeSql`response.status_code between 200 and 299`,"status_code.warning":a.safeSql`response.status_code between 400 and 499`,"product.database":a.safeSql`request.path like '/rest/%' or request.path like '/graphql/%'`,"product.storage":a.safeSql`request.path like '/storage/%'`,"product.auth":a.safeSql`request.path like '/auth/%'`,"product.realtime":a.safeSql`request.path like '/realtime/%'`,"method.get":a.safeSql`request.method = 'GET'`,"method.post":a.safeSql`request.method = 'POST'`,"method.put":a.safeSql`request.method = 'PUT'`,"method.patch":a.safeSql`request.method = 'PATCH'`,"method.delete":a.safeSql`request.method = 'DELETE'`,"method.options":a.safeSql`request.method = 'OPTIONS'`},function_edge_logs:{...u,"status_code.error":a.safeSql`response.status_code between 500 and 599`,"status_code.success":a.safeSql`response.status_code between 200 and 299`,"status_code.warning":a.safeSql`response.status_code between 400 and 499`},function_logs:{...u,"severity.error":a.safeSql`metadata.level = 'error'`,"severity.notError":a.safeSql`metadata.level != 'error'`,"severity.log":a.safeSql`metadata.level = 'log'`,"severity.info":a.safeSql`metadata.level = 'info'`,"severity.debug":a.safeSql`metadata.level = 'debug'`,"severity.warn":a.safeSql`metadata.level = 'warn'`},auth_logs:{...u,"severity.error":c,"severity.warning":d,"severity.info":g,"status_code.server_error":a.safeSql`cast(metadata.status as int64) between 500 and 599`,"status_code.client_error":a.safeSql`cast(metadata.status as int64) between 400 and 499`,"status_code.redirection":a.safeSql`cast(metadata.status as int64) between 300 and 399`,"status_code.success":a.safeSql`cast(metadata.status as int64) between 200 and 299`,"endpoints.admin":a.safeSql`REGEXP_CONTAINS(metadata.path, "/admin")`,"endpoints.signup":a.safeSql`REGEXP_CONTAINS(metadata.path, "/signup|/invite|/verify")`,"endpoints.authentication":a.safeSql`REGEXP_CONTAINS(metadata.path, "/token|/authorize|/callback|/otp|/magiclink")`,"endpoints.recover":a.safeSql`REGEXP_CONTAINS(metadata.path, "/recover")`,"endpoints.user":a.safeSql`REGEXP_CONTAINS(metadata.path, "/user")`,"endpoints.logout":a.safeSql`REGEXP_CONTAINS(metadata.path, "/logout")`},realtime_logs:{...u},storage_logs:{...u},postgrest_logs:{...u,database:e=>a.safeSql`identifier = ${(0,a.analyticsLiteral)(e)}`},pgbouncer_logs:{...u},supavisor_logs:{...u,database:e=>a.safeSql`m.project like ${(0,a.analyticsLiteral)(e+"%")}`},pg_upgrade_logs:{...u},pg_cron_logs:{...u},etl_replication_logs:{...u,pipeline_id:e=>a.safeSql`pipeline_id = ${(0,a.analyticsLiteral)(e)}`}};var p=((t={}).EDGE="edge_logs",t.POSTGRES="postgres_logs",t.FUNCTIONS="function_logs",t.FN_EDGE="function_edge_logs",t.AUTH="auth_logs",t.AUTH_AUDIT="auth_audit_logs",t.REALTIME="realtime_logs",t.STORAGE="storage_logs",t.POSTGREST="postgrest_logs",t.SUPAVISOR="supavisor_logs",t.PGBOUNCER="pgbouncer_logs",t.PG_UPGRADE="pg_upgrade_logs",t.PG_CRON="pg_cron_logs",t.ETL="etl_replication_logs",t.MULTIGRES="multigres_logs",t);let f={postgres_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events with ERROR, PANIC, or FATAL"},{key:"noError",label:"No Error",description:"Show all non-error events"},{key:"log",label:"Log",description:"Show all events that are log severity"}]}},edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]},product:{label:"Product",key:"product",options:[{key:"database",label:"Database",description:""},{key:"auth",label:"Auth",description:""},{key:"storage",label:"Storage",description:""},{key:"realtime",label:"Realtime",description:""}]},method:{label:"Method",key:"method",options:[{key:"get",label:"GET",description:""},{key:"options",label:"OPTIONS",description:""},{key:"put",label:"PUT",description:""},{key:"post",label:"POST",description:""},{key:"patch",label:"PATCH",description:""},{key:"delete",label:"DELETE",description:""}]}},...s.IS_PLATFORM?{function_edge_logs:{status_code:{label:"Status",key:"status_code",options:[{key:"error",label:"Error",description:"500 error codes"},{key:"success",label:"Success",description:"200 codes"},{key:"warning",label:"Warning",description:"400 codes"}]}}}:{},function_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:'Show all events that are "error" severity'},{key:"warn",label:"Warning",description:'Show all events that are "warn" severity'},{key:"info",label:"Info",description:'Show all events that are "info" severity'},{key:"debug",label:"Debug",description:'Show all events that are "debug" severity'},{key:"log",label:"Log",description:'Show all events that are "log" severity'}]}},auth_logs:{severity:{label:"Severity",key:"severity",options:[{key:"error",label:"Error",description:"Show all events that have error or fatal severity"},{key:"warning",label:"Warning",description:"Show all events that have warning severity"},{key:"info",label:"Info",description:"Show all events that have info severity"}]},status_code:{label:"Status Code",key:"status_code",options:[{key:"server_error",label:"Server Error",description:"Show all requests with 5XX status code"},{key:"client_error",label:"Client Error",description:"Show all requests with 4XX status code"},{key:"redirection",label:"Redirection",description:"Show all requests that have 3XX status code"},{key:"success",label:"Success",description:"Show all requests that have 2XX status code"}]},endpoints:{label:"Endpoints",key:"endpoints",options:[{key:"admin",label:"Admin",description:"Show all admin requests"},{key:"signup",label:"Sign up",description:"Show all signup and authorization requests"},{key:"recover",label:"Password Recovery",description:"Show all password recovery requests"},{key:"authentication",label:"Authentication",description:"Show all authentication flow requests (login, otp, and Oauth2)"},{key:"user",label:"User",description:"Show all user data requests"},{key:"logout",label:"Logout",description:"Show all logout requests"}]}}},m=[{text:"Last 15 minutes",calcFrom:()=>(0,r.default)().subtract(15,"minute").toISOString(),calcTo:()=>""},{text:"Last 30 minutes",calcFrom:()=>(0,r.default)().subtract(30,"minute").toISOString(),calcTo:()=>""},{text:"Last hour",calcFrom:()=>(0,r.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,r.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,r.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 2 days",calcFrom:()=>(0,r.default)().subtract(2,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,r.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 5 days",calcFrom:()=>(0,r.default)().subtract(5,"day").toISOString(),calcTo:()=>""}],_=[{text:"Last hour",calcFrom:()=>(0,r.default)().subtract(1,"hour").toISOString(),calcTo:()=>"",default:!0},{text:"Last 3 hours",calcFrom:()=>(0,r.default)().subtract(3,"hour").toISOString(),calcTo:()=>""},{text:"Last 24 hours",calcFrom:()=>(0,r.default)().subtract(1,"day").toISOString(),calcTo:()=>""},{text:"Last 3 days",calcFrom:()=>(0,r.default)().subtract(3,"day").toISOString(),calcTo:()=>""},{text:"Last 7 days",calcFrom:()=>(0,r.default)().subtract(7,"day").toISOString(),calcTo:()=>""}];e.s(["AUTH_LOG_ERROR_CONDITION",0,c,"AUTH_LOG_WARNING_CONDITION",0,d,"EXPLORER_DATEPICKER_HELPERS",0,_,"FILTER_OPTIONS",0,f,"LOGS_EXPLORER_DOCS_URL",0,o,"LOGS_LARGE_DATE_RANGE_DAYS_THRESHOLD",0,2,"LOGS_SOURCE_DESCRIPTION",0,{edge_logs:"Logs obtained from the network edge, containing all API requests",postgres_logs:"Database logs obtained directly from Postgres",function_logs:"Function logs generated from runtime execution",function_edge_logs:"Function call logs, containing the request and response",auth_logs:"Errors, warnings, and performance details from the auth service",auth_audit_logs:"Audit records of user signups, logins, and account changes",realtime_logs:"Realtime server for Postgres logical replication broadcasting",storage_logs:"Object storage logs",postgrest_logs:"RESTful API web server logs",supavisor_logs:"Shared connection pooler logs for PostgreSQL",pgbouncer_logs:"Dedicated connection pooler for PostgreSQL",pg_upgrade_logs:"Logs generated by the Postgres version upgrade process",pg_cron_logs:"Postgres logs from pg_cron cron jobs",etl_replication_logs:"Logs from the replication process",multigres_logs:"Logs from the Multigres high availability service"},"LOGS_TABLES",0,{api:"edge_logs",database:"postgres_logs",functions:"function_logs",fn_edge:"function_edge_logs",auth:"auth_logs",realtime:"realtime_logs",storage:"storage_logs",postgrest:"postgrest_logs",supavisor:"supavisor_logs",pg_upgrade:"pg_upgrade_logs",pg_cron:"postgres_logs",pgbouncer:"pgbouncer_logs",etl:"etl_replication_logs",multigres:"multigres_logs"},"LOG_ROUTES_WITH_REPLICA_SUPPORT",0,["/project/[ref]/logs/edge-logs","/project/[ref]/logs/pooler-logs","/project/[ref]/logs/postgres-logs","/project/[ref]/logs/postgrest-logs"],"LogsTableName",()=>p,"PREVIEWER_DATEPICKER_HELPERS",0,m,"SQL_FILTER_TEMPLATES",0,h,"TIER_QUERY_LIMITS",0,{FREE:{text:"1 day",value:1,unit:"day",promptUpgrade:!0},PRO:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},PAYG:{text:"7 days",value:7,unit:"day",promptUpgrade:!0},TEAM:{text:"28 days",value:28,unit:"day",promptUpgrade:!0},ENTERPRISE:{text:"90 days",value:90,unit:"day",promptUpgrade:!1},PLATFORM:{text:"1 day",value:1,unit:"day",promptUpgrade:!1}},"getDefaultHelper",0,e=>e.find(e=>e.default)||e[0],"getLogsTemplates",0,function(e){return e?n.map(e=>{let t=e.label&&l[e.label];return t?{...e,searchString:t}:e}):n}])},586468,(e,t,s)=>{var r;let a;e.e,r=function e(){"use strict";var t="u">typeof self?self:"u">typeof window?window:void 0!==t?t:{},s=!t.document&&!!t.postMessage,r=t.IS_PAPA_WORKER||!1,a={},i=0,o={parse:function(s,r){var n,l=(r=r||{}).dynamicTyping||!1;if(v(l)&&(r.dynamicTypingFunction=l,l={}),r.dynamicTyping=l,r.transform=!!v(r.transform)&&r.transform,r.worker&&o.WORKERS_SUPPORTED){var h=function(){if(!o.WORKERS_SUPPORTED)return!1;var s,r,n=(s=t.URL||t.webkitURL||null,r=e.toString(),o.BLOB_URL||(o.BLOB_URL=s.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",r,")();"],{type:"text/javascript"})))),l=new t.Worker(n);return l.onmessage=m,l.id=i++,a[l.id]=l}();return h.userStep=r.step,h.userChunk=r.chunk,h.userComplete=r.complete,h.userError=r.error,r.step=v(r.step),r.chunk=v(r.chunk),r.complete=v(r.complete),r.error=v(r.error),delete r.worker,void h.postMessage({input:s,config:r,workerId:h.id})}var p=null;return o.NODE_STREAM_INPUT,"string"==typeof s?(s=65279===(n=s).charCodeAt(0)?n.slice(1):n,p=r.download?new u(r):new d(r)):!0===s.readable&&v(s.read)&&v(s.on)?p=new g(r):(t.File&&s instanceof File||s instanceof Object)&&(p=new c(r)),p.stream(s)},unparse:function(e,t){var s=!1,r=!0,a=",",i="\r\n",n='"',l=n+n,u=!1,c=null,d=!1;if("object"==typeof t){if("string"!=typeof t.delimiter||o.BAD_DELIMITERS.filter(function(e){return -1!==t.delimiter.indexOf(e)}).length||(a=t.delimiter),("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(s=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(u=t.skipEmptyLines),"string"==typeof t.newline&&(i=t.newline),"string"==typeof t.quoteChar&&(n=t.quoteChar),"boolean"==typeof t.header&&(r=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw Error("Option columns is empty");c=t.columns}void 0!==t.escapeChar&&(l=t.escapeChar+n),("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(d=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/)}var g=RegExp(p(n),"g");if("string"==typeof e&&(e=JSON.parse(e)),Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return h(null,e,u);if("object"==typeof e[0])return h(c||Object.keys(e[0]),e,u)}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||c),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),h(e.fields||[],e.data||[],u);throw Error("Unable to serialize unrecognized input");function h(e,t,s){var o="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,l=!Array.isArray(t[0]);if(n&&r){for(var u=0;u<e.length;u++)0<u&&(o+=a),o+=f(e[u],u);0<t.length&&(o+=i)}for(var c=0;c<t.length;c++){var d=n?e.length:t[c].length,g=!1,h=n?0===Object.keys(t[c]).length:0===t[c].length;if(s&&!n&&(g="greedy"===s?""===t[c].join("").trim():1===t[c].length&&0===t[c][0].length),"greedy"===s&&n){for(var p=[],m=0;m<d;m++){var _=l?e[m]:m;p.push(t[c][_])}g=""===p.join("").trim()}if(!g){for(var b=0;b<d;b++){0<b&&!h&&(o+=a);var S=n&&l?e[b]:b;o+=f(t[c][S],b)}c<t.length-1&&(!s||0<d&&!h)&&(o+=i)}}return o}function f(e,t){if(null==e)return"";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var r=!1;d&&"string"==typeof e&&d.test(e)&&(e="'"+e,r=!0);var i=e.toString().replace(g,l);return(r=r||!0===s||"function"==typeof s&&s(e,t)||Array.isArray(s)&&s[t]||function(e,t){for(var s=0;s<t.length;s++)if(-1<e.indexOf(t[s]))return!0;return!1}(i,o.BAD_DELIMITERS)||-1<i.indexOf(a)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?n+i+n:i}}};if(o.RECORD_SEP="\x1e",o.UNIT_SEP="\x1f",o.BYTE_ORDER_MARK="\uFEFF",o.BAD_DELIMITERS=["\r","\n",'"',o.BYTE_ORDER_MARK],o.WORKERS_SUPPORTED=!s&&!!t.Worker,o.NODE_STREAM_INPUT=1,o.LocalChunkSize=0xa00000,o.RemoteChunkSize=5242880,o.DefaultDelimiter=",",o.Parser=f,o.ParserHandle=h,o.NetworkStreamer=u,o.FileStreamer=c,o.StringStreamer=d,o.ReadableStreamStreamer=g,t.jQuery){var n=t.jQuery;n.fn.parse=function(e){var s=e.config||{},r=[];return this.each(function(e){if(!("INPUT"===n(this).prop("tagName").toUpperCase()&&"file"===n(this).attr("type").toLowerCase()&&t.FileReader)||!this.files||0===this.files.length)return!0;for(var a=0;a<this.files.length;a++)r.push({file:this.files[a],inputElem:this,instanceConfig:n.extend({},s)})}),a(),this;function a(){if(0!==r.length){var t,s,a,l=r[0];if(v(e.before)){var u=e.before(l.file,l.inputElem);if("object"==typeof u){if("abort"===u.action)return t=l.file,s=l.inputElem,a=u.reason,void(v(e.error)&&e.error({name:"AbortError"},t,s,a));if("skip"===u.action)return void i();"object"==typeof u.config&&(l.instanceConfig=n.extend(l.instanceConfig,u.config))}else if("skip"===u)return void i()}var c=l.instanceConfig.complete;l.instanceConfig.complete=function(e){v(c)&&c(e,l.file,l.inputElem),i()},o.parse(l.file,l.instanceConfig)}else v(e.complete)&&e.complete()}function i(){r.splice(0,1),a()}}}function l(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},(function(e){var t=S(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null),this._handle=new h(t),(this._handle.streamer=this)._config=t}).call(this,e),this.parseChunk=function(e,s){if(this.isFirstChunk&&v(this._config.beforeFirstChunk)){var a=this._config.beforeFirstChunk(e);void 0!==a&&(e=a)}this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var l=n.meta.cursor;this._finished||(this._partialLine=i.substring(l-this._baseIndex),this._baseIndex=l),n&&n.data&&(this._rowCount+=n.data.length);var u=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(r)t.postMessage({results:n,workerId:o.WORKER_ID,finished:u});else if(v(this._config.chunk)&&!s){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!u||!v(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),u||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0},this._sendError=function(e){v(this._config.error)?this._config.error(e):r&&this._config.error&&t.postMessage({workerId:o.WORKER_ID,error:e,finished:!1})}}function u(e){var t;(e=e||{}).chunkSize||(e.chunkSize=o.RemoteChunkSize),l.call(this,e),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded()}:function(){this._readChunk()},this.stream=function(e){this._input=e,this._nextChunk()},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(t=new XMLHttpRequest,this._config.withCredentials&&(t.withCredentials=this._config.withCredentials),s||(t.onload=y(this._chunkLoaded,this),t.onerror=y(this._chunkError,this)),t.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var r in e)t.setRequestHeader(r,e[r])}if(this._config.chunkSize){var a=this._start+this._config.chunkSize-1;t.setRequestHeader("Range","bytes="+this._start+"-"+a)}try{t.send(this._config.downloadRequestBody)}catch(e){this._chunkError(e.message)}s&&0===t.status&&this._chunkError()}},this._chunkLoaded=function(){var e;4===t.readyState&&(t.status<200||400<=t.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:t.responseText.length,this._finished=!this._config.chunkSize||this._start>=(null===(e=t.getResponseHeader("Content-Range"))?-1:parseInt(e.substring(e.lastIndexOf("/")+1))),this.parseChunk(t.responseText)))},this._chunkError=function(e){var s=t.statusText||e;this._sendError(Error(s))}}function c(e){(e=e||{}).chunkSize||(e.chunkSize=o.LocalChunkSize),l.call(this,e);var t,s,r="u">typeof FileReader;this.stream=function(e){this._input=e,s=e.slice||e.webkitSlice||e.mozSlice,r?((t=new FileReader).onload=y(this._chunkLoaded,this),t.onerror=y(this._chunkError,this)):t=new FileReaderSync,this._nextChunk()},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk()},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var a=Math.min(this._start+this._config.chunkSize,this._input.size);e=s.call(e,this._start,a)}var i=t.readAsText(e,this._config.encoding);r||this._chunkLoaded({target:{result:i}})},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result)},this._chunkError=function(){this._sendError(t.error)}}function d(e){var t;l.call(this,e=e||{}),this.stream=function(e){return t=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,s=this._config.chunkSize;return s?(e=t.substring(0,s),t=t.substring(s)):(e=t,t=""),this._finished=!t,this.parseChunk(e)}}}function g(e){l.call(this,e=e||{});var t=[],s=!0,r=!1;this.pause=function(){l.prototype.pause.apply(this,arguments),this._input.pause()},this.resume=function(){l.prototype.resume.apply(this,arguments),this._input.resume()},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError)},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0)},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):s=!0},this._streamData=y(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),s&&(s=!1,this._checkIsFinished(),this.parseChunk(t.shift()))}catch(e){this._streamError(e)}},this),this._streamError=y(function(e){this._streamCleanUp(),this._sendError(e)},this),this._streamEnd=y(function(){this._streamCleanUp(),r=!0,this._streamData("")},this),this._streamCleanUp=y(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError)},this)}function h(e){var t,s,r,a=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,i=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,n=this,l=0,u=0,c=!1,d=!1,g=[],h={data:[],errors:[],meta:{}};if(v(e.step)){var m=e.step;e.step=function(t){if(h=t,y())b();else{if(b(),0===h.data.length)return;l+=t.data.length,e.preview&&l>e.preview?s.abort():(h.data=h.data[0],m(h,n))}}}function _(t){return"greedy"===e.skipEmptyLines?""===t.join("").trim():1===t.length&&0===t[0].length}function b(){return h&&r&&(E("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+o.DefaultDelimiter+"'"),r=!1),e.skipEmptyLines&&(h.data=h.data.filter(function(e){return!_(e)})),y()&&function(){if(h)if(Array.isArray(h.data[0])){for(var t=0;y()&&t<h.data.length;t++)h.data[t].forEach(s);h.data.splice(0,1)}else h.data.forEach(s);function s(t,s){v(e.transformHeader)&&(t=e.transformHeader(t,s)),g.push(t)}}(),function(){if(!h||!e.header&&!e.dynamicTyping&&!e.transform)return h;function t(t,s){var r,o=e.header?{}:[];for(r=0;r<t.length;r++){var n,l,c=r,d=t[r];e.header&&(c=r>=g.length?"__parsed_extra":g[r]),e.transform&&(d=e.transform(d,c)),n=c,l=d,e.dynamicTypingFunction&&void 0===e.dynamicTyping[n]&&(e.dynamicTyping[n]=e.dynamicTypingFunction(n)),d=!0===(e.dynamicTyping[n]||e.dynamicTyping)?"true"===l||"TRUE"===l||"false"!==l&&"FALSE"!==l&&(!function(e){if(a.test(e)){var t=parseFloat(e);if(-0x20000000000000<t&&t<0x20000000000000)return!0}return!1}(l)?i.test(l)?new Date(l):""===l?null:l:parseFloat(l)):l,"__parsed_extra"===c?(o[c]=o[c]||[],o[c].push(d)):o[c]=d}return e.header&&(r>g.length?E("FieldMismatch","TooManyFields","Too many fields: expected "+g.length+" fields but parsed "+r,u+s):r<g.length&&E("FieldMismatch","TooFewFields","Too few fields: expected "+g.length+" fields but parsed "+r,u+s)),o}var s=1;return!h.data.length||Array.isArray(h.data[0])?(h.data=h.data.map(t),s=h.data.length):h.data=t(h.data,0),e.header&&h.meta&&(h.meta.fields=g),u+=s,h}()}function y(){return e.header&&0===g.length}function E(e,t,s,r){var a={type:e,code:t,message:s};void 0!==r&&(a.row=r),h.errors.push(a)}this.parse=function(a,i,n){var l=e.quoteChar||'"';if(e.newline||(e.newline=function(e,t){e=e.substring(0,1048576);var s=RegExp(p(t)+"([^]*?)"+p(t),"gm"),r=(e=e.replace(s,"")).split("\r"),a=e.split("\n"),i=1<a.length&&a[0].length<r[0].length;if(1===r.length||i)return"\n";for(var o=0,n=0;n<r.length;n++)"\n"===r[n][0]&&o++;return o>=r.length/2?"\r\n":"\r"}(a,l)),r=!1,e.delimiter)v(e.delimiter)&&(e.delimiter=e.delimiter(a),h.meta.delimiter=e.delimiter);else{var u=function(t,s,r,a,i){var n,l,u,c;i=i||[",","	","|",";",o.RECORD_SEP,o.UNIT_SEP];for(var d=0;d<i.length;d++){var g=i[d],h=0,p=0,m=0;u=void 0;for(var b=new f({comments:a,delimiter:g,newline:s,preview:10}).parse(t),S=0;S<b.data.length;S++)if(r&&_(b.data[S]))m++;else{var y=b.data[S].length;p+=y,void 0!==u?0<y&&(h+=Math.abs(y-u),u=y):u=y}0<b.data.length&&(p/=b.data.length-m),(void 0===l||h<=l)&&(void 0===c||c<p)&&1.99<p&&(l=h,n=g,c=p)}return{successful:!!(e.delimiter=n),bestDelimiter:n}}(a,e.newline,e.skipEmptyLines,e.comments,e.delimitersToGuess);u.successful?e.delimiter=u.bestDelimiter:(r=!0,e.delimiter=o.DefaultDelimiter),h.meta.delimiter=e.delimiter}var d=S(e);return e.preview&&e.header&&d.preview++,t=a,h=(s=new f(d)).parse(t,i,n),b(),c?{meta:{paused:!0}}:h||{meta:{paused:!1}}},this.paused=function(){return c},this.pause=function(){c=!0,s.abort(),t=v(e.chunk)?"":t.substring(s.getCharIndex())},this.resume=function(){n.streamer._halted?(c=!1,n.streamer.parseChunk(t,!0)):setTimeout(n.resume,3)},this.aborted=function(){return d},this.abort=function(){d=!0,s.abort(),h.meta.aborted=!0,v(e.complete)&&e.complete(h),t=""}}function p(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function f(e){var t,s=(e=e||{}).delimiter,r=e.newline,a=e.comments,i=e.step,n=e.preview,l=e.fastMode,u=t=void 0===e.quoteChar||null===e.quoteChar?'"':e.quoteChar;if(void 0!==e.escapeChar&&(u=e.escapeChar),("string"!=typeof s||-1<o.BAD_DELIMITERS.indexOf(s))&&(s=","),a===s)throw Error("Comment character same as delimiter");!0===a?a="#":("string"!=typeof a||-1<o.BAD_DELIMITERS.indexOf(a))&&(a=!1),"\n"!==r&&"\r"!==r&&"\r\n"!==r&&(r="\n");var c=0,d=!1;this.parse=function(o,g,h){if("string"!=typeof o)throw Error("Input must be a string");var f=o.length,m=s.length,_=r.length,b=a.length,S=v(i),y=[],E=[],q=[],R=c=0;if(!o)return B();if(e.header&&!g){var T=o.split(r)[0].split(s),k=[],O={},w=!1;for(var I in T){var N=T[I];v(e.transformHeader)&&(N=e.transformHeader(N,I));var A=N,L=O[N]||0;for(0<L&&(w=!0,A=N+"_"+L),O[N]=L+1;k.includes(A);)A=A+"_"+L;k.push(A)}if(w){var C=o.split(r);C[0]=k.join(s),o=C.join(r)}}if(l||!1!==l&&-1===o.indexOf(t)){for(var P=o.split(r),x=0;x<P.length;x++){if(q=P[x],c+=q.length,x!==P.length-1)c+=r.length;else if(h)break;if(!a||q.substring(0,b)!==a){if(S){if(y=[],G(q.split(s)),K(),d)return B()}else G(q.split(s));if(n&&n<=x)return y=y.slice(0,n),B(!0)}}return B()}for(var $=o.indexOf(s,c),j=o.indexOf(r,c),F=RegExp(p(u)+p(t),"g"),D=o.indexOf(t,c);;)if(o[c]!==t)if(a&&0===q.length&&o.substring(c,c+b)===a){if(-1===j)return B();c=j+_,j=o.indexOf(r,c),$=o.indexOf(s,c)}else if(-1!==$&&($<j||-1===j))q.push(o.substring(c,$)),c=$+m,$=o.indexOf(s,c);else{if(-1===j)break;if(q.push(o.substring(c,j)),z(j+_),S&&(K(),d))return B();if(n&&y.length>=n)return B(!0)}else for(D=c,c++;;){if(-1===(D=o.indexOf(t,D+1)))return h||E.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:y.length,index:c}),W();if(D===f-1)return W(o.substring(c,D).replace(F,t));if(t!==u||o[D+1]!==u){if(t===u||0===D||o[D-1]!==u){-1!==$&&$<D+1&&($=o.indexOf(s,D+1)),-1!==j&&j<D+1&&(j=o.indexOf(r,D+1));var M=H(-1===j?$:Math.min($,j));if(o.substr(D+1+M,m)===s){q.push(o.substring(c,D).replace(F,t)),o[c=D+1+M+m]!==t&&(D=o.indexOf(t,c)),$=o.indexOf(s,c),j=o.indexOf(r,c);break}var U=H(j);if(o.substring(D+1+U,D+1+U+_)===r){if(q.push(o.substring(c,D).replace(F,t)),z(D+1+U+_),$=o.indexOf(s,c),D=o.indexOf(t,c),S&&(K(),d))return B();if(n&&y.length>=n)return B(!0);break}E.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:y.length,index:c}),D++}}else D++}return W();function G(e){y.push(e),R=c}function H(e){var t=0;if(-1!==e){var s=o.substring(D+1,e);s&&""===s.trim()&&(t=s.length)}return t}function W(e){return h||(void 0===e&&(e=o.substring(c)),q.push(e),c=f,G(q),S&&K()),B()}function z(e){c=e,G(q),q=[],j=o.indexOf(r,c)}function B(e){return{data:y,errors:E,meta:{delimiter:s,linebreak:r,aborted:d,truncated:!!e,cursor:R+(g||0)}}}function K(){i(B()),y=[],E=[]}},this.abort=function(){d=!0},this.getCharIndex=function(){return c}}function m(e){var t=e.data,s=a[t.workerId],r=!1;if(t.error)s.userError(t.error,t.file);else if(t.results&&t.results.data){var i={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}})},pause:b,resume:b};if(v(s.userStep)){for(var o=0;o<t.results.data.length&&(s.userStep({data:t.results.data[o],errors:t.results.errors,meta:t.results.meta},i),!r);o++);delete t.results}else v(s.userChunk)&&(s.userChunk(t.results,i,t.file),delete t.results)}t.finished&&!r&&_(t.workerId,t.results)}function _(e,t){var s=a[e];v(s.userComplete)&&s.userComplete(t),s.terminate(),delete a[e]}function b(){throw Error("Not implemented.")}function S(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var s in e)t[s]=S(e[s]);return t}function y(e,t){return function(){e.apply(t,arguments)}}function v(e){return"function"==typeof e}return r&&(t.onmessage=function(e){var s=e.data;if(void 0===o.WORKER_ID&&s&&(o.WORKER_ID=s.workerId),"string"==typeof s.input)t.postMessage({workerId:o.WORKER_ID,results:o.parse(s.input,s.config),finished:!0});else if(t.File&&s.input instanceof File||s.input instanceof Object){var r=o.parse(s.input,s.config);r&&t.postMessage({workerId:o.WORKER_ID,results:r,finished:!0})}}),(u.prototype=Object.create(l.prototype)).constructor=u,(c.prototype=Object.create(l.prototype)).constructor=c,(d.prototype=Object.create(d.prototype)).constructor=d,(g.prototype=Object.create(l.prototype)).constructor=g,o},"function"==typeof define&&define.amd?void 0!==(a=r())&&e.v(a):t.exports=r()},813412,e=>{"use strict";var t=e.i(755175),s=e.i(586468);function r(e){return e.map(e=>{let t={};for(let s of Object.keys(e)){let r=e[s];t[s]="object"==typeof r?JSON.stringify(r):r}return t})}e.s(["convertResultsToCSV",0,function(e){if(0===e.length)return;let t=function(e){let t=Array.from(e)[0];if(t)return Object.keys(t)}(e),a=r(e);return s.default.unparse(a,{columns:t})},"convertResultsToJSON",0,function(e){if(0!==e.length)return JSON.stringify(e,null,2)},"convertResultsToMarkdown",0,function(e){let s=r(e);if(0===s.length)return;let a=Object.keys(s[0]),i=s.map(e=>a.map(t=>String(e[t]??""))),o=[a,...i];return(0,t.markdownTable)(o)}])},884892,e=>{"use strict";let t=class{_line;_text;_lines;model;offset;lineNumber;constructor(e,t,s){this.model=e,this.offset=t,this.lineNumber=s,this._text=e.getValue(),this._lines=this._text.split(/\r?\n/g),this._line=this._lines[s]}hasNext(){return this.lineNumber>=0||this.offset>=0}isFowardDQuote(){return!!this.hasForward()&&34===this.peekForward()}isNextDQuote(){return!!this.hasNext()&&34===this.peekNext()}isNextPeriod(){return!!this.hasNext()&&46===this.peekNext()}peekNext(){return this.offset<0?10*(this.lineNumber>0):this._line.charCodeAt(this.offset)}hasForward(){return this.lineNumber<this._lines.length||this.offset<this._line.length}peekForward(){return this.offset===this._line.length?10*(this.lineNumber!==this._lines.length):this._line.charCodeAt(this.offset+1)}next(){if(this.offset<0)return this.lineNumber>0?(this.lineNumber--,this._line=this._lines[this.lineNumber],this.offset=this._line.length-1,10):(this.lineNumber=-1,0);let e=this._line.charCodeAt(this.offset);return this.offset--,e}readArguments(){let e=0,t=0,s=0,r=0;for(;this.hasNext();){let a=this.next();switch(a){case 40:if(--e<0)return r;break;case 41:e++;break;case 123:s--;break;case 125:s++;break;case 91:t--;break;case 93:t++;break;case 34:case 39:for(;this.hasNext()&&a!==this.next(););break;case 44:!e&&!t&&!s&&r++}}return -1}readIdent(){let e=!1,t=!1,s="";for(;this.hasNext();){let r=this.peekNext();if(e&&!t&&!this._isIdentPart(r))break;if(r=this.next(),!e&&t&&34===r){e=!0;continue}if(e||32!==r&&9!==r&&10!=r){if(!e&&(34===r||this._isIdentPart(r)))e=!0,t=34===r,s=String.fromCharCode(r)+s;else if(e)if(t){if(0===r||(s=String.fromCharCode(r)+s,34===r))break}else s=String.fromCharCode(r)+s}}return s}readIdents(e){let t=[];for(;e>0;){e--;let s=this.readIdent();if(!s||(t.push(s),!this.isNextPeriod()))break}return t.reverse()}_isIdentPart(e){return 95===e||e>=97&&e<=122||e>=65&&e<=90||e>=48&&e<=57}};e.s(["default",0,t])},460988,e=>{"use strict";var t=e.i(616992);e.i(128328);var s=e.i(86086),r=e.i(55956),a=e.i(691152),i=e.i(539256),o=e.i(416340),n=e.i(285006),l=e.i(993394),u=e.i(813412),c=e.i(884892),d=e.i(562616);let g=e=>r.default.utc(Number(e)/1e3).toISOString(),h=e=>{let t=16===String(e).length;return!Number.isNaN(Number(e))&&t},p=(e,t)=>Object.keys(e).filter(t=>e[t]).flatMap(s=>{let r=t?`${t}.${s}`:s;return"object"==typeof e[s]?p(e[s],r):[r]}),f=(e,t)=>{if("string"!=typeof t&&"number"!=typeof t&&"boolean"!=typeof t)return null;try{return d.safeSql`${(0,d.quotedIdent)(e)} = ${(0,d.analyticsLiteral)(t)}`}catch{return null}},m=(e,t,s=l.SQL_FILTER_TEMPLATES[e],r=f)=>{let i=Object.keys(t),o=e=>{let i=s[e],o=(0,a.default)(t,e);return void 0===i?r(e,o):"function"==typeof i?void 0!==o?i(o):null:i&&!1!==o?i:null};return i.map(e=>{if(void 0===t[e]||"string"==typeof t[e]&&0===t[e].length)return null;if("object"==typeof t[e]){let s=p(t[e],e).map(o).filter(e=>null!==e);return s.length>0?d.safeSql`(${(0,d.joinSqlFragments)(s," or ")})`:null}{let t=o(e);return null===t?null:d.safeSql`(${t})`}}).filter(e=>null!==e)},_=(e,t,s,r)=>{let a=m(e,t,s,r);return a.length>0?d.safeSql`where ${(0,d.joinSqlFragments)(a," and ")}`:d.safeSql``},b=e=>{switch(e){case"edge_logs":return d.safeSql`cross join unnest(metadata) as m
  cross join unnest(m.request) as request
  cross join unnest(m.response) as response`;case"pg_cron_logs":case"postgres_logs":return d.safeSql`cross join unnest(metadata) as m
  cross join unnest(m.parsed) as parsed`;case"function_logs":case"auth_logs":return d.safeSql`cross join unnest(metadata) as metadata`;case"function_edge_logs":return d.safeSql`cross join unnest(metadata) as m
  cross join unnest(m.response) as response
  cross join unnest(m.request) as request`;case"supavisor_logs":return d.safeSql`cross join unnest(metadata) as m`;default:return d.safeSql``}},S={[l.LogsTableName.EDGE]:d.safeSql`edge_logs`,[l.LogsTableName.POSTGRES]:d.safeSql`postgres_logs`,[l.LogsTableName.FUNCTIONS]:d.safeSql`function_logs`,[l.LogsTableName.FN_EDGE]:d.safeSql`function_edge_logs`,[l.LogsTableName.AUTH]:d.safeSql`auth_logs`,[l.LogsTableName.AUTH_AUDIT]:d.safeSql`auth_audit_logs`,[l.LogsTableName.REALTIME]:d.safeSql`realtime_logs`,[l.LogsTableName.STORAGE]:d.safeSql`storage_logs`,[l.LogsTableName.POSTGREST]:d.safeSql`postgrest_logs`,[l.LogsTableName.SUPAVISOR]:d.safeSql`supavisor_logs`,[l.LogsTableName.PGBOUNCER]:d.safeSql`pgbouncer_logs`,[l.LogsTableName.PG_UPGRADE]:d.safeSql`pg_upgrade_logs`,[l.LogsTableName.PG_CRON]:d.safeSql`pg_cron_logs`,[l.LogsTableName.ETL]:d.safeSql`etl_replication_logs`,[l.LogsTableName.MULTIGRES]:d.safeSql`multigres_logs`},y=e=>{let t=(0,r.default)(e);return e&&t.isValid()?t:(0,r.default)()},v=s.IS_PLATFORM?d.safeSql`( parsed.application_name = 'pg_cron' or regexp_contains(event_message, 'cron job') )`:d.safeSql`( parsed.application_name = 'pg_cron' or event_message::text LIKE '%cron job%' )`,E=d.safeSql`where ${v}`,q={minute:d.safeSql`minute`,hour:d.safeSql`hour`,day:d.safeSql`day`},R=e=>{let t=e.reduce((e,t)=>{let s=T(t);return e[s]+=1,e},{second:0,minute:0,hour:0,day:0});return Object.keys(t).reduce((e,s)=>t[e]>t[s]?e:s)},T=e=>({0:"second",1:"minute",2:"hour",3:"day"})[["second","minute","hour"].map(t=>e.get(t)).reduce((e,t)=>(0===t&&(e+=1),e),0)];function k(e){return e.map((e,t)=>{let s=[`## Log ${t+1}`];if(e.timestamp){let t,r=Number(e.timestamp);if(isFinite(r))t=new Date(r/1e3).toISOString();else if("string"==typeof e.timestamp){let s=new Date(e.timestamp);t=isNaN(s.getTime())?e.timestamp:s.toISOString()}else t=String(e.timestamp);s.push(`**Timestamp:** ${t}`)}e.event_message&&s.push(`**Message:** ${e.event_message}`);let{id:r,timestamp:a,event_message:i,...o}=e;return Object.keys(o).length>0&&s.push("","**Details:**","```json",JSON.stringify(o,null,2),"```"),s.join("\n")}).join("\n\n---\n\n")}let O={api:"API Gateway (Edge Network)",database:"Postgres Database",functions:"Edge Functions",fn_edge:"Edge Functions (edge runtime)",auth:"Auth",realtime:"Realtime",storage:"Storage",supavisor:"Supavisor (connection pooling)",postgrest:"PostgREST",pg_upgrade:"Postgres upgrade",pg_cron:"pg_cron",pgbouncer:"PgBouncer",etl:"ETL",multigres:"Multigres"},w={edge_logs:"API Gateway (Edge Network)",postgres_logs:"Postgres Database",function_logs:"Edge Functions",function_edge_logs:"Edge Functions (edge runtime)",auth_logs:"Auth",auth_audit_logs:"Auth (audit)",realtime_logs:"Realtime",storage_logs:"Storage",postgrest_logs:"PostgREST",supavisor_logs:"Supavisor (connection pooling)",pgbouncer_logs:"PgBouncer",pg_upgrade_logs:"Postgres upgrade",pg_cron_logs:"pg_cron",etl_replication_logs:"ETL",multigres_logs:"Multigres"};e.s(["apiKey",0,function(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.apikey?.[0]?.apikey?.[0];if(t)return t.error?`${t.prefix}... <invalid: ${t.error}>`:`${t.prefix}...`},"buildLogsPrompt",0,function(e,t,s){let r,a,i=(t&&t in O?O[t]:null)??(s?(r=s.match(/\bfrom\s+(\w+)/i),(a=r?.[1])&&a in w?w[a]:null):null),o=i?` from the **${i}** service`:"",n=s?`

**Query used:**
\`\`\`sql
${s.trim()}
\`\`\``:"";return`I have ${e.length} Supabase log entr${1===e.length?"y":"ies"}${o} I'd like help debugging:

`+k(e)+n+"\n\nWhat do these logs indicate? What steps can I take to resolve it? Keep your answer very concise and actionable. Max 2 or 3 bullet points."},"buildWhereClauses",0,m,"checkForILIKEClause",0,function(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(ILIKE)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)},"checkForLimitClause",0,function(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(LIMIT)\b\s+\d+(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)},"checkForWithClause",0,function(e){let t=e.replace(/--.*$/gm,"").replace(/\/\*[\s\S]*?\*\//gm,"");return/\b(WITH)\b(?=(?:[^']*'[^']*')*[^']*$)/i.test(t)},"extractEdgeFunctionName",0,function(e){if("string"!=typeof e||!e)return"";let t=e.split("/").filter(Boolean);return t[t.length-1]??""},"fillTimeseries",0,(e,t,s,a,i,o,n=20,l)=>{let u;if(0===e.length&&!(i&&o))return[];if(e.length>n)return e.map(e=>{let s=e[t],a=h(s)?g(s):r.default.utc(s).toISOString();return e[t]=a,e});if(e.length<=1&&!(i&&o))return e;let c=e.map(e=>r.default.utc(e[t])),d=o?r.default.utc(o):r.default.utc(Math.max.apply(null,c)),p=i?r.default.utc(i):r.default.utc(Math.min.apply(null,c)),f=e.length>0?c:[p,d],m=1;if(l){let e=l.match(/^(\d+)(m|h|d|s)$/);e?(m=parseInt(e[1],10),u=({s:"second",m:"minute",h:"hour",d:"day"})[e[2]]):u=R(f)}else u=R(f);0!==e.length||l||(u="minute");let _=e.map(e=>{let a=e[t],i=h(a)?g(a):r.default.utc(a).toISOString();return Array.isArray(s)&&0===s.length?{[t]:i}:(e[t]=i,e)}),b=p;for(;b.isBefore(d)||b.isSame(d);){if(!c.find(e=>e.year()===b.year()&&e.month()===b.month()&&e.date()===b.date()&&e.hour()===b.hour()&&e.minute()===b.minute()&&e.second()===b.second())){let e=("string"==typeof s?[s]:s).reduce((e,t)=>({...e,[t]:a}),{});_.push({[t]:b.toISOString(),...e})}b=b.add(m,u)}return _},"formatLogsAsCsv",0,function(e){return(0,u.convertResultsToCSV)(e)??""},"formatLogsAsJson",0,function(e){return JSON.stringify(e,null,2)},"formatLogsAsMarkdown",0,k,"genChartQuery",0,(e,t,s)=>{let r,a,i,o,n,u,[c,g]=(r=y(t.iso_timestamp_end),a=y(t.iso_timestamp_start),i="minute",o=360,n=r.diff(a,"minute"),u=r.diff(a,"hour"),n>720?(i="hour",o=120):u>72&&(i="day",o=7),[a.add(-o,i),i]),h=_(e,s),p=function(e){switch(e){case"edge_logs":case"function_edge_logs":return d.safeSql`response.status_code >= 500`;case"postgres_logs":case"pg_cron_logs":return d.safeSql`parsed.error_severity IN ('ERROR', 'FATAL', 'PANIC')`;case"auth_logs":return l.AUTH_LOG_ERROR_CONDITION;case"function_logs":return d.safeSql`metadata.level IN ('error', 'fatal')`;case"multigres_logs":return d.safeSql`JSON_VALUE(event_message, '$.level') IN ('ERROR', 'FATAL', 'PANIC')`;default:return d.safeSql`false`}}(e),f=function(e){switch(e){case"edge_logs":case"function_edge_logs":return d.safeSql`response.status_code >= 400 AND response.status_code < 500`;case"postgres_logs":return d.safeSql`parsed.error_severity IN ('WARNING')`;case"auth_logs":return l.AUTH_LOG_WARNING_CONDITION;case"function_logs":return d.safeSql`metadata.level IN ('warning')`;case"multigres_logs":return d.safeSql`JSON_VALUE(event_message, '$.level') IN ('WARN', 'WARNING')`;default:return d.safeSql`false`}}(e);e===l.LogsTableName.PG_CRON&&(e=l.LogsTableName.POSTGRES,h=E);let m=b(e),v=(0,d.analyticsLiteral)(c.toISOString()),R=h?d.safeSql`${h} and t.timestamp > ${v}`:d.safeSql`where t.timestamp > ${v}`;return d.safeSql`
SELECT
-- log-event-chart
  timestamp_trunc(t.timestamp, ${q[g]}) as timestamp,
  count(CASE WHEN NOT (${p} OR ${f}) THEN 1 END) as ok_count,
  count(CASE WHEN ${p} THEN 1 END) as error_count,
  count(CASE WHEN ${f} THEN 1 END) as warning_count,
FROM
  ${S[e]} t
  ${m}
  ${R}
GROUP BY
timestamp
ORDER BY
  timestamp ASC
  `},"genCountQuery",0,(e,t)=>{let s=_(e,t);e===l.LogsTableName.PG_CRON&&(e=l.LogsTableName.POSTGRES,s=E);let r=b(e);return d.safeSql`SELECT count(*) as count FROM ${S[e]} ${r} ${s}`},"genDefaultQuery",0,(e,t,r=100)=>{let a=_(e,t),i=b(e),o=d.safeSql`order by timestamp desc`,n=(0,d.analyticsLiteral)(r);switch(e){case"edge_logs":if(!s.IS_PLATFORM)return d.safeSql`
-- local dev edge_logs query
select id, edge_logs.timestamp, event_message, request.method, request.path, request.search, response.status_code
from edge_logs
${i}
${a}
${o}
limit ${n};
`;return d.safeSql`select id, identifier, timestamp, event_message, request.method, request.path, request.search, response.status_code
  from ${S[e]}
  ${i}
  ${a}
  ${o}
  limit ${n}
  `;case"postgres_logs":if(!s.IS_PLATFORM)return d.safeSql`
select postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint
from postgres_logs
${i}
${a}
${o}
limit ${n}
  `;return d.safeSql`select identifier, postgres_logs.timestamp, id, event_message, parsed.error_severity, parsed.detail, parsed.hint from ${S[e]}
  ${i}
  ${a}
  ${o}
  limit ${n}
  `;case"function_logs":return d.safeSql`select id, ${S[e]}.timestamp, event_message, metadata.event_type, metadata.function_id, metadata.execution_id, metadata.level from ${S[e]}
  ${i}
  ${a}
  ${o}
  limit ${n}
    `;case"auth_logs":return d.safeSql`select id, ${S[e]}.timestamp, event_message, metadata.level, metadata.status, metadata.path, metadata.msg as msg, metadata.error from ${S[e]}
  ${i}
  ${a}
  ${o}
  limit ${n}
    `;case"function_edge_logs":if(!s.IS_PLATFORM)return d.safeSql`
select id, function_edge_logs.timestamp, event_message
from function_edge_logs
${o}
limit ${n}
`;return d.safeSql`select id, ${S[e]}.timestamp, event_message, response.status_code, request.method, request.pathname, m.function_id, m.execution_id, m.execution_time_ms, m.deployment_id, m.version from ${S[e]}
  ${i}
  ${a}
  ${o}
  limit ${n}
  `;case"supavisor_logs":return d.safeSql`select id, ${S[e]}.timestamp, event_message from ${S[e]} ${i} ${a} ${o} limit ${n}`;case"pg_upgrade_logs":return d.safeSql`select id, ${S[e]}.timestamp, event_message from ${S[e]} ${i} ${a} ${o} limit ${(0,d.analyticsLiteral)(100)}`;case"pg_cron_logs":{let s=m(e,t),r=s.length>0?d.safeSql`where ${v} AND ${(0,d.joinSqlFragments)(s," and ")}`:E;return d.safeSql`select id, postgres_logs.timestamp, event_message, parsed.error_severity, parsed.query
from postgres_logs
${i}
${r}
${o}
limit ${n}
`}default:return d.safeSql`select id, ${S[e]}.timestamp, event_message from ${S[e]}
  ${a}
  ${o}
  limit ${n}
  `}},"genSingleLogQuery",0,(e,t)=>{let s=e===l.LogsTableName.MULTIGRES?d.safeSql``:d.safeSql`, metadata`;return d.safeSql`select id, timestamp, event_message${s} from ${S[e]} where id = ${(0,d.analyticsLiteral)(t)} limit 1`},"getAuthLogSeverity",0,function(e,t){let s="string"==typeof e?e:"";if("error"===s||"fatal"===s)return s;let r="number"==typeof t?t:"string"==typeof t?Number(t):NaN,a=Number.isFinite(r);return a&&r>=500?"error":"warning"===s||a&&r>=400?"warning":s},"isDefaultLogPreviewFormat",0,e=>e&&e.timestamp&&e.event_message&&e.id,"isUnixMicro",0,h,"jwtAPIKey",0,function(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.apikey?.[0];if(!t)return;if(t.invalid)return"<invalid>";let s=t?.payload?.[0];return s&&"HS256"===s.algorithm&&"supabase"===s.issuer&&["anon","service_role"].includes(s.role)&&!s.subject?s.role:"<unrecognized>"},"maybeShowUpgradePromptIfNotEntitled",0,(e,t)=>!!t&&Math.abs((0,r.default)().diff((0,r.default)(e),"day"))>t,"parseMultigresEventMessage",0,e=>{if("string"!=typeof e)return null;try{let t=JSON.parse(e);return t&&"object"==typeof t&&!Array.isArray(t)?t:null}catch{return null}},"resolveLogTimestamp",0,y,"role",0,function(e){let t=e?.[0]?.request?.[0]?.sb?.[0]?.jwt?.[0]?.authorization?.[0];if(!t||t.invalid)return;let s=t?.payload?.[0];if(s&&s.role)return s.role},"unixMicroToIsoTimestamp",0,g,"useEditorHints",0,()=>{let e=(0,t.useMonaco)();(0,o.useEffect)(()=>{if(e){let t=e.languages.registerCompletionItemProvider("pgsql",{triggerCharacters:["`"," ","."],provideCompletionItems:function(t,s,r){let a=new c.default(t,s.column-2,s.lineNumber-1);if(a.isNextDQuote())return{suggestions:[]};let o=[],l=n.default.schemas.filter(e=>a._text.includes(e.reference));if(0===l.length&&(l=n.default.schemas),a.isNextPeriod()){let t=l.flatMap(e=>e.fields).flatMap(e=>{let[t,...s]=e.path.split(".");return s}).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));o=o.concat(t)}if("`"===r.triggerCharacter||" "===r.triggerCharacter){let t=n.default.schemas.map(t=>({label:t.reference,kind:e.languages.CompletionItemKind.Class,insertText:t.reference})),s=l.flatMap(e=>e.fields).flatMap(e=>e.path.split(".").slice(0,-1)).map(t=>({label:t,kind:e.languages.CompletionItemKind.Property,insertText:t}));o=(o=o.concat(s)).concat(t)}return{suggestions:(0,i.default)(o,"label")}}});return()=>{t.dispose()}}},[e])}])}]);

//# debugId=2d12c2d6-cb77-8fd5-7779-08f5f85cb79b