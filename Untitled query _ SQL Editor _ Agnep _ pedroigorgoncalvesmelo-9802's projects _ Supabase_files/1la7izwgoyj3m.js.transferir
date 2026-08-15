;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="c1fe5ab4-1dac-2ef1-43df-bf298f2be842")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,977264,562616,189723,e=>{"use strict";e.i(850036);var t=e.i(479084),a=e.i(55956),r=e.i(531837),n=e.i(249909);function i(e){return e}function s(e,...t){return e.reduce((e,a,r)=>e+a+(t[r]??""),"")}let o=/^[A-Za-z_][A-Za-z0-9_]*$/;function l(e){return e&&(0,a.default)(e).isValid()?e:null}e.s(["acceptUntrustedLogsSql",0,function(e){return e},"analyticsLiteral",0,function(e){if("number"==typeof e){if(!Number.isFinite(e))throw Error("analyticsLiteral: non-finite numbers are not supported");return String(e)}if("boolean"==typeof e)return e?s`true`:s`false`;if("string"!=typeof e)throw Error("analyticsLiteral: only string, number, or boolean inputs are supported");let t="";for(let a of e)"'"===a?t+="''":"\\"===a?t+="\\\\":t+=a;return`'${t}'`},"joinSqlFragments",0,function(e,t){return e.join(t)},"quotedIdent",0,function(e){let t=e.split(".");if(0===t.length||t.some(e=>!o.test(e)))throw Error(`quotedIdent: invalid identifier "${e}"`);return t.map(e=>"`"+e+"`").join(".")},"safeSql",0,s,"untrustedLogSql",0,i],562616),e.s(["isoDateTimeString",0,l],189723);let c=r.string().transform((e,t)=>{let a=l(e);return null===a?(t.addIssue({code:n.ZodIssueCode.custom,message:"must be a valid ISO-8601 datetime"}),r.NEVER):a}),d=r.object({type:r.enum(["bar","line"]),x_column:r.string(),y_columns:r.array(r.string()),cumulative:r.boolean(),scale:r.enum(["linear","log"]).default("linear"),show_labels:r.boolean()}),m=r.object({_tag:r.literal("absolute_time_range"),start:c,end:c}),u=r.object({_tag:r.literal("relative_time_range"),unit:r.enum(["minute","hour","day","week","month","year"]),amount:r.number().int().positive()}),p=r.discriminatedUnion("_tag",[m,u]).refine(e=>{if("absolute_time_range"!==e._tag)return!0;let t=(0,a.default)(e.start),r=(0,a.default)(e.end);return!(t.isValid()&&r.isValid())||r.isAfter(t)},{message:"must be later than the start of the range",path:["end"]}),g=r.object({database_identifier:r.string().optional()}),f=r.object({time_range:p}),_=r.object({id:r.string()}),h=_.extend({title:r.string().optional(),view:r.enum(["table","chart"]).optional(),chart:d.optional()}),b=_.extend({_tag:r.literal("markdown_cell"),text:r.string()}),y=h.extend({_tag:r.literal("database_cell"),sql:r.string(),row_limit:r.number(),...g.shape}),S=h.extend({_tag:r.literal("log_cell"),sql:r.string(),...f.shape}),E=r.discriminatedUnion("_tag",[b,y,S]);r.object({schema_version:r.literal(1),cells:r.array(E)});let w=r.discriminatedUnion("_tag",[b.extend({id:r.string().optional()}),y.extend({id:r.string().optional()}),S.extend({id:r.string().optional()})]);r.object({schema_version:r.literal(1),cells:r.array(w)});let v=r.discriminatedUnion("_tag",[b.omit({id:!0}).strict(),y.omit({id:!0}).strict(),S.omit({id:!0}).strict()]);r.object({schema_version:r.literal(1),cells:r.array(v)});let q=E.transform(e=>{switch(e._tag){case"markdown_cell":return e;case"database_cell":{let{sql:a,view:r,...n}=e;return{...n,view:r??"table",unchecked_sql:(0,t.untrustedSql)(a)}}case"log_cell":{let{sql:t,view:a,...r}=e;return{...r,view:a??"table",unchecked_sql:i(t)}}}}),$=r.object({schema_version:r.literal(1),cells:r.array(q)}),R={markdown_cell:"content",database_cell:"query",log_cell:"query"};e.s(["databaseSourceSchema",0,g,"isQueryCell",0,e=>"query"===R[e._tag],"logsSourceSchema",0,f,"notebookDomainSchema",0,$],977264)},591052,e=>{"use strict";function t(e){let t=parseFloat(e);return Number.isFinite(t)?t:void 0}function a(e){let t=parseInt(e,10);return Number.isNaN(t)?void 0:t}function r(e){if(e.details){let t=e.details.match(/Rows Removed by Filter:\s*(\d+)/);t&&(e.rowsRemovedByFilter=a(t[1]))}e.children.forEach(r)}e.s(["calculateMaxDuration",0,function(e){return e.reduce((e,t)=>Math.max(e,function e(t){return Math.max(t.actualTime?t.actualTime.end-t.actualTime.start:0,t.children.reduce((t,a)=>Math.max(t,e(a)),0))}(t)),0)},"calculateSummary",0,function(e){let t={totalTime:0,totalCost:0,maxCost:0,hasSeqScan:!1,seqScanTables:[],hasIndexScan:!1},a=e=>{e.actualTime&&(t.totalTime=Math.max(t.totalTime,e.actualTime.end)),e.cost&&(t.maxCost=Math.max(t.maxCost,e.cost.end));let r=e.operation.toLowerCase();if(r.includes("seq scan")){t.hasSeqScan=!0;let a=e.details.match(/on\s+((?:"[^"]+"|[\w]+)(?:\.(?:"[^"]+"|[\w]+))*)/);a&&t.seqScanTables.push(a[1])}r.includes("index")&&(t.hasIndexScan=!0),e.children.forEach(a)};return e.forEach(a),t.totalCost=e[0]?.cost?.end??0,t},"createNodeTree",0,function(e){let n=function(e){let r=e.map(e=>e["QUERY PLAN"]||"").filter(Boolean),n=[],i=[],s=/^(Filter|Sort Key|Group Key|Hash Cond|Join Filter|Index Cond|Recheck Cond|Rows Removed by Filter|Rows Removed by Index Recheck|Output|Merge Cond|Sort Method|Worker \d+|Buffers|Planning Time|Execution Time|One-Time Filter|InitPlan|SubPlan):/;for(let e=0;e<r.length;e++){let o=r[e];if(!o.trim())continue;let l=o.match(/^(\s*)/),c=l?l[1].length:0,d=o.includes("->"),m=o,u=c;if(d){let e=o.indexOf("->");u=e,m=o.substring(e+2).trim()}else m=o.trim();if(m.startsWith("Planning Time:")||m.startsWith("Execution Time:")||m.startsWith("Planning:")||m.startsWith("Execution:"))continue;if(s.test(m)&&i.length>0){let e=i[i.length-1].node;e.details+=(e.details?"\n":"")+m;continue}if(!d&&i.length>0&&c>0){let e=i[i.length-1];if(c>e.indent&&!m.match(/^\w+.*\(cost=/)){e.node.details+=(e.node.details?"\n":"")+m;continue}}let p=m.match(/^(.+?)\s*(\([^)]*cost=[^)]+\)(?:\s*\([^)]+\))*)?\s*$/);if(!p)continue;let[,g,f]=p,_=f?f.replace(/^\(|\)$/g,"").replace(/\)\s*\(/g," "):void 0,h=g.trim(),b="",y=g.match(/^(.+?)\s+on\s+(.+)$/i),S=g.match(/^(.+?)\s+using\s+(.+)$/i);y?(h=y[1].trim(),b="on "+y[2].trim()):S&&(h=S[1].trim(),b="using "+S[2].trim()),function(e,t,a,r){for(;r.length>0&&r[r.length-1].indent>=t;)r.pop();0===r.length?a.push(e):r[r.length-1].node.children.push(e),r.push({node:e,indent:t})}(function(e,r,n,i,s){let o={operation:e.trim(),details:r?.trim()||"",level:i,children:[],raw:s};if(n){let e=n.match(/cost=([\d.]+)\.\.([\d.]+)/);if(e){let a=t(e[1]),r=t(e[2]);void 0!==a&&void 0!==r&&(o.cost={start:a,end:r})}let r=n.match(/rows=(\d+)/);r&&(o.rows=a(r[1]));let i=n.match(/width=(\d+)/);i&&(o.width=a(i[1]));let s=n.match(/actual time=([\d.]+)\.\.([\d.]+)/);if(s){let e=t(s[1]),r=t(s[2]);void 0!==e&&void 0!==r&&(o.actualTime={start:e,end:r});let i=n.substring(n.indexOf("actual time=")).match(/rows=(\d+)/);i&&(o.actualRows=a(i[1]))}}return o}(h,b,_,d?Math.floor(u/6)+1:0,o),u,n,i)}return n}(e);return n.forEach(r),n},"parseDetailLines",0,function(e){if(!e)return[];let t=e.split("\n").filter(Boolean),a=[];for(let e of t){let t=e.indexOf(":");t>0?a.push({label:e.substring(0,t+1),value:e.substring(t+1).trim()}):e.trim()&&a.push({label:"",value:e.trim()})}return a}])},441331,e=>{"use strict";e.s(["logsAllEndpointUrl",0,e=>e?"/platform/projects/{ref}/analytics/endpoints/logs.all.otel":"/platform/projects/{ref}/analytics/endpoints/logs.all","pickLogsQueryBuilder",0,(e,t,a)=>e?t:a])},682586,e=>{"use strict";var t=e.i(531837),a=e.i(977264),r=e.i(441331);let n=t.discriminatedUnion("_tag",[t.object({_tag:t.literal("database"),...a.databaseSourceSchema.shape}).strict(),t.object({_tag:t.literal("logs"),...a.logsSourceSchema.shape}).strict()]),i={_tag:"relative_time_range",unit:"hour",amount:1},s={database:{_tag:"database",endpoint:"/platform/pg-meta/{ref}/query",parameters:{}},logs:{_tag:"logs",endpoint:(0,r.logsAllEndpointUrl)(!0),parameters:{time_range:i}}},o=Object.values(s),l=e=>"relative_time_range"===e._tag?{_tag:e._tag,unit:e.unit,amount:e.amount}:{_tag:e._tag,start:e.start,end:e.end};function c(e){return"logs"===e._tag?{_tag:"logs",time_range:l(e.time_range)}:{_tag:"database",database_identifier:e.database_identifier}}e.s(["DEFAULT_LOG_TIME_RANGE",0,i,"QUERY_SOURCES",0,o,"QUERY_SOURCE_LABELS",0,{database:"Database",logs:"Logs"},"QUERY_SOURCE_REGISTRY",0,s,"createDefaultSourceBinding",0,function(e){return"logs"===e?{_tag:"logs",time_range:l(s.logs.parameters.time_range)}:{_tag:"database"}},"getQuerySourceBinding",0,function(e){return"log_cell"===e._tag?c({_tag:"logs",time_range:e.time_range}):c({_tag:"database",database_identifier:e.database_identifier})},"querySourceBindingSchema",0,n,"toQuerySourceBinding",0,c])},534259,690247,e=>{"use strict";let t={TableCreated:"table_created",TableDataAdded:"table_data_added",TableRLSEnabled:"table_rls_enabled"};Object.values(t),e.s(["TABLE_EVENT_ACTIONS",0,t],690247);class a{static DETECTORS=[{type:t.TableCreated,patterns:[/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?<schema>(?:"[^"]+"|[\w]+)\.)?(?<table>(?:"(?:[^"]|"")+"|`(?:[^`]|``)+`|[\w]+))/i,/CREATE\s+TEMP(?:ORARY)?\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?<schema>(?:"[^"]+"|[\w]+)\.)?(?<table>(?:"(?:[^"]|"")+"|`(?:[^`]|``)+`|[\w]+))/i,/CREATE\s+UNLOGGED\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?<schema>(?:"[^"]+"|[\w]+)\.)?(?<table>(?:"(?:[^"]|"")+"|`(?:[^`]|``)+`|[\w]+))/i,/SELECT\s+.*?\s+INTO\s+(?<schema>(?:"[^"]+"|[\w]+)\.)?(?<table>(?:"(?:[^"]|"")+"|`(?:[^`]|``)+`|[\w]+))/is,/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(?<schema>(?:"[^"]+"|[\w]+)\.)?(?<table>(?:"(?:[^"]|"")+"|`(?:[^`]|``)+`|[\w]+))\s+AS\s+SELECT/i]},{type:t.TableDataAdded,patterns:[/INSERT\s+INTO\s+(?<schema>(?:"[^"]+"|[\w]+)\.)?(?<table>(?:"(?:[^"]|"")+"|`(?:[^`]|``)+`|[\w]+))/i,/COPY\s+(?<schema>(?:"[^"]+"|[\w]+)\.)?(?<table>(?:"(?:[^"]|"")+"|`(?:[^`]|``)+`|[\w]+))\s+FROM/i]},{type:t.TableRLSEnabled,patterns:[/ALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?(?:ONLY\s+)?(?<schema>(?:"[^"]+"|[\w]+)\.)?(?<table>(?:"(?:[^"]|"")+"|`(?:[^`]|``)+`|[\w]+)).*?ENABLE\s+ROW\s+LEVEL\s+SECURITY/i,/ALTER\s+TABLE\s+(?:IF\s+EXISTS\s+)?(?:ONLY\s+)?(?<schema>(?:"[^"]+"|[\w]+)\.)?(?<table>(?:"(?:[^"]|"")+"|`(?:[^`]|``)+`|[\w]+)).*?ENABLE\s+RLS/i]}];cleanIdentifier(e){return e?.replace(/["`']/g,"").replace(/\.$/,"")}stripDollarQuoteBodies(e){return e.replace(/(\$[a-zA-Z0-9_]*\$)[\s\S]*?\1/g,"$1$1")}match(e){for(let{type:t,patterns:r}of a.DETECTORS)for(let a of r){let r=e.match(a);if(r?.groups)return{type:t,schema:this.cleanIdentifier(r.groups.schema),tableName:this.cleanIdentifier(r.groups.table??r.groups.object)}}return null}splitStatements(e){let t=e.match(/'([^']|'')*'|"([^"]|"")*"|\$[a-zA-Z0-9_]*\$[\s\S]*?\$[a-zA-Z0-9_]*\$|;|[^'"$;]+/g)||[],a=[],r="";for(let e of t)";"===e?(r.trim()&&a.push(r.trim()),r=""):r+=e;return r.trim()&&a.push(r.trim()),a}deduplicate(e){let t=new Set;return e.filter(e=>{let a=`${e.type}:${e.schema||""}:${e.tableName||""}`;return!t.has(a)&&(t.add(a),!0)})}removeComments(e){return e.replace(/--.*?$/gm,"").replace(/\/\*[\s\S]*?\*\//g,"")}getTableEvents(e){let t=this.splitStatements(this.removeComments(this.stripDollarQuoteBodies(e))),a=[];for(let e of t){let t=this.match(e);t&&a.push(t)}return this.deduplicate(a)}}let r=new a;e.s(["sqlEventParser",0,r],534259)},617361,e=>{"use strict";e.i(850036);var t=e.i(389273),a=e.i(248593),r=e.i(705541),n=e.i(964574),i=e.i(739114),s=e.i(591052),o=e.i(234745),l=e.i(682586),c=e.i(10429),d=e.i(534259),m=e.i(967052);let u=["branches","settings-v2","addons","custom-domains","content"],p="Query cost exceeds threshold";async function g({projectRef:e,connectionString:r,sql:n,queryKey:i,handleError:d,isRoleImpersonationEnabled:m=!1,isStatementTimeoutDisabled:u=!1,preflightCheck:f=!1},_,h,b){let y,S;if(!e)throw Error("projectRef is required");if(new Blob([n]).size>.98*c.MB)throw Error("Query is too large to be run via the SQL Editor");let E=new Headers(h);if(r&&E.set("x-connection-encrypted",r),b){let e=await b({query:n,headers:E});"data"in e?y=e.data:S=e.error}else{let t={signal:_,headers:E,params:{path:{ref:e},header:{"x-connection-encrypted":r??"","x-pg-application-name":u?"supabase/dashboard-query-editor":a.DEFAULT_PLATFORM_APPLICATION_NAME}}};if(f){let{data:e}=await (0,o.post)("/platform/pg-meta/{ref}/query",{...t,body:{query:`explain ${n}`,disable_statement_timeout:u},params:{...t.params,query:{key:"preflight-check"}}}),a=e?(0,s.createNodeTree)(e):void 0,r=a?(0,s.calculateSummary)(a):void 0,i=r?.totalCost??0;if(i>=2e5)return(0,o.handleError)({message:p,code:i,metadata:{cost:i,sql:n}})}let c=i?.filter(e=>"string"==typeof e||"number"==typeof e).join("-")??"",d=await (0,o.post)(l.QUERY_SOURCE_REGISTRY.database.endpoint,{...t,body:{query:n,disable_statement_timeout:u},params:{...t.params,query:{key:c}}});y=d.data,S=d.error}if(S){if(m&&"object"==typeof S&&null!==S&&"error"in S&&"formattedError"in S){let e=S,a=/LINE (\d+):/im,[,r]=a.exec(e.error)??[],n=Number(r);isNaN(n)||(e={...e,error:e.error.replace(a,`LINE ${n-t.ROLE_IMPERSONATION_SQL_LINE_COUNT}:`),formattedError:e.formattedError.replace(a,`LINE ${n-t.ROLE_IMPERSONATION_SQL_LINE_COUNT}:`)}),S=e}if(void 0!==d)return d(S);(0,o.handleError)(S)}return m&&Array.isArray(y)&&y?.[0]?.[t.ROLE_IMPERSONATION_NO_RESULTS]===1?{result:[]}:{result:y}}e.s(["COST_THRESHOLD_ERROR",0,p,"executeSql",0,g,"useExecuteSqlMutation",0,({onSuccess:e,onError:t,...a}={})=>{let s=(0,n.useQueryClient)(),o=(0,m.useTrack)();return(0,r.useMutation)({mutationFn:e=>g(e),async onSuccess(t,a,r){let{contextualInvalidation:n,sql:i,projectRef:l}=a;try{d.sqlEventParser.getTableEvents(i).forEach(e=>{l&&o(e.type,{method:"sql_editor",schema_name:e.schema,table_name:e.tableName},{project:l})})}catch(e){console.error("Failed to parse SQL for telemetry:",e)}let c=i.toLowerCase(),m=c.includes("create ")||c.includes("alter ")||c.includes("drop ");if(n&&l&&m){let e=s.getQueryCache().findAll({queryKey:["projects",l]}).map(e=>e.queryKey).filter(e=>!u.some(t=>e.includes(t)));await Promise.all(e.map(e=>s.invalidateQueries({queryKey:e})))}await e?.(t,a,r)},async onError(e,a,r){void 0===t?i.toast.error(`Failed to execute SQL: ${e.message}`):t(e,a,r)},...a})}])},246230,21150,e=>{"use strict";let t={query:(e,t)=>["projects",e,"query",...t],ongoingQueries:e=>["projects",e,"ongoing-queries"]};e.s(["sqlKeys",0,t],21150),e.s(["databaseKeys",0,{schemas:e=>["projects",e,"schemas"],keywords:e=>["projects",e,"keywords"],migrations:e=>["projects",e,"migrations"],tableColumns:(e,t,a)=>["projects",e,"table-columns",t,a],databaseFunctions:(e,t)=>["projects",e,"database-functions",t].filter(Boolean),entityDefinition:(e,t)=>["projects",e,"entity-definition",t],entityDefinitions:(e,t)=>["projects",e,"entity-definitions",t],tableDefinition:(e,t)=>["projects",e,"table-definition",t],viewDefinition:(e,t,a)=>["projects",e,"view-definition",t,a??!1],backups:e=>["projects",e,"database","backups"],poolingConfiguration:e=>["projects",e,"database","pooling-configuration"],indexesFromQuery:(e,t)=>["projects",e,"indexes",{query:t}],indexAdvisorFromQuery:(e,t,a)=>{let r;if(a)try{r=new URL(a).host}catch{r=void 0}return["projects",e,"index-advisor",{query:t,connectionFingerprint:r}]},tableConstraints:(e,t)=>["projects",e,"table-constraints",t],foreignKeyConstraints:(e,t,a={})=>["projects",e,"foreign-key-constraints",t,a],databaseSize:e=>["projects",e,"database-size"],maxConnections:e=>["projects",e,"max-connections"],pgbouncerStatus:e=>["projects",e,"pgbouncer","status"],pgbouncerConfig:e=>["projects",e,"pgbouncer","config"],checkPrimaryKeysExists:(e,t)=>["projects",e,"check-primary-keys",t],tableIndexAdvisor:(e,t,a)=>["projects",e,"table-index-advisor",t,a],supamonitorEnabled:e=>["projects",e,"supamonitor-enabled"],databaseActivity:e=>["projects",e,"database-activity"]},"getLiveTupleEstimateKey",0,(e,a,r="public")=>t.query(e,["live-tuple-estimate",r,a])],246230)},801834,e=>{"use strict";var t=e.i(850036),a=e.i(125356),r=e.i(246230),n=e.i(617361),i=e.i(681328);let s=t.default.schemas.list();async function o({projectRef:e,connectionString:t},a){let{result:r}=await (0,n.executeSql)({projectRef:e,connectionString:t,sql:s.sql,queryKey:["schemas"]},a);return Array.isArray(r)?r:i.EMPTY_ARR}e.s(["getSchemas",0,o,"invalidateSchemasQuery",0,function(e,t){return e.invalidateQueries({queryKey:r.databaseKeys.schemas(t)})},"prefetchSchemas",0,function(e,{projectRef:t,connectionString:a}){return e.fetchQuery({queryKey:r.databaseKeys.schemas(t),queryFn:({signal:e})=>o({projectRef:t,connectionString:a},e)})},"useSchemasQuery",0,({projectRef:e,connectionString:t},{enabled:n=!0,...i}={})=>(0,a.useQuery)({queryKey:r.databaseKeys.schemas(e),queryFn:({signal:a})=>o({projectRef:e,connectionString:t},a),enabled:n&&void 0!==e,...i})])},12214,e=>{"use strict";var t=e.i(531837),a=e.i(615515);let r=t.object({index:t.number(),columns:t.array(t.object({name:t.string(),type:t.string()})),is_new_schema:t.boolean(),schema:t.string(),schema_name:t.string(),table_name:t.string(),object:t.any().optional()}).passthrough(),n=e=>Object.fromEntries(e.map(e=>e.split("=")));function i(e,t){if("wasm_fdw_handler"===e.handlerName){let a=n(t?.server_options??[]);return e.server.options.find(e=>"fdw_package_name"===e.name)?.defaultValue===a.fdw_package_name}return e.handlerName===t?.handler}e.s(["NewTable",0,{},"convertKVStringArrayToJson",0,n,"formatWrapperTables",0,(e,t)=>(e?.tables??[]).map(r=>{let n=0,i=Object.fromEntries(r.options.map(e=>e.split("=")));switch(e.handler){case a.WRAPPER_HANDLERS.STRIPE:n=t?.tables.findIndex(e=>e.options.find(e=>"object"===e.name)?.defaultValue===i.object)??0;break;case a.WRAPPER_HANDLERS.FIREBASE:n="auth/users"===i.object?t?.tables.findIndex(e=>e.options.find(e=>"auth/users"===e.defaultValue))??0:t?.tables.findIndex(e=>"Firestore Collection"===e.label)??0;case a.WRAPPER_HANDLERS.S3:case a.WRAPPER_HANDLERS.AIRTABLE:case a.WRAPPER_HANDLERS.LOGFLARE:case a.WRAPPER_HANDLERS.BIG_QUERY:case a.WRAPPER_HANDLERS.CLICK_HOUSE:}return{...i,index:n,id:r.id,columns:r.columns??[],is_new_schema:!1,schema:r.schema,schema_name:r.schema,table_name:r.name}}),"getEditionFormSchema",0,e=>{let a={wrapper_name:t.string().min(1,"Please provide a name for your wrapper"),tables:t.array(r,{required_error:"Please provide at least one table"}).min(1,"Please provide at least one table")};return e.server.options.forEach(e=>{if(e.required){a[e.name]=t.string().min(1,"Required");return}a[e.name]=t.string().optional()}),t.object(a)},"getRequiredExtensionsToInstall",0,function(e,t){return void 0===e?null:e.filter(e=>t.includes(e.name)&&!e.installed_version)},"getTableFormSchema",0,e=>{let a={table_name:t.string().min(1,"Required"),schema:t.string().min(1,"Required"),schema_name:t.string().optional(),columns:t.array(t.object({name:t.string().min(1,"Required"),type:t.string().min(1,"Required")}))};return e.options.forEach(e=>{if(e.required){a[e.name]=t.string().min(1,"Required");return}a[e.name]=t.string().optional()}),t.object(a).passthrough().superRefine((e,t)=>{"custom"!==e.schema||e.schema_name||t.addIssue({code:"custom",path:["schema_name"],message:"Required"})})},"getWrapperCreationFormSchema",0,e=>{let a={wrapper_name:t.string().min(1,"Please provide a name for your wrapper")};return e.server.options.forEach(e=>{if(e.required){a[e.name]=t.string().min(1,"Required");return}a[e.name]=t.string().optional()}),t.discriminatedUnion("mode",[t.object({mode:t.literal("tables"),tables:t.array(r,{required_error:"Please provide at least one table"}).min(1,"Please provide at least one table")}).merge(t.object(a)),t.object({mode:t.literal("schema"),source_schema:t.string().min(1,"Please provide a source schema"),target_schema:t.string().min(1,"Please provide an unique target schema")}).merge(t.object(a))])},"getWrapperMetaForWrapper",0,function(e){return a.WRAPPERS.find(t=>i(t,e))},"hasForeignSchemaSupport",0,function(e){return!!e?.installed_version&&e.installed_version>="0.5.0"},"wrapperMetaComparator",0,i])},298625,33942,584258,e=>{"use strict";e.i(850036);var t=e.i(479084);let a=()=>t.safeSql`
    select
      s.oid as "id",
      w.fdwname as "name",
      s.srvname as "server_name",
      s.srvoptions as "server_options",
      c.proname as "handler",
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', c.oid::bigint,
            'schema', relnamespace::regnamespace::text,
            'name', c.relname,
            'columns', (
              select jsonb_agg(
                jsonb_build_object(
                  'name', a.attname,
                  'type', pg_catalog.format_type(a.atttypid, a.atttypmod)
                )
              )
              from pg_catalog.pg_attribute a
              where a.attrelid = c.oid and a.attnum > 0 and not a.attisdropped
            ),
            'options', t.ftoptions
          )
        )
        from pg_catalog.pg_class c
        join pg_catalog.pg_foreign_table t on c.oid = t.ftrelid
        where c.oid = any (select t.ftrelid from pg_catalog.pg_foreign_table t where t.ftserver = s.oid)
      ) as "tables"
    from pg_catalog.pg_foreign_server s
    join pg_catalog.pg_foreign_data_wrapper w on s.srvfdw = w.oid
    join pg_catalog.pg_proc c on w.fdwhandler = c.oid;
  `;function r({wrapperMeta:e,formState:a,mode:n,tables:i,sourceSchema:s,targetSchema:o,schemaOptions:l=[]}){let c=(0,t.joinSqlFragments)(i.filter(e=>e.is_new_schema).map(e=>t.safeSql`create schema if not exists ${(0,t.ident)(e.schema_name)};`),"\n"),d=t.safeSql`
    create foreign data wrapper ${(0,t.ident)(a.wrapper_name)}
    handler ${(0,t.ident)(e.handlerName)}
    validator ${(0,t.ident)(e.validatorName)};
  `,m=e.server.options.filter(e=>e.encrypted),u=e.server.options.filter(e=>!e.encrypted),p=m.map(e=>{let r=`${a.wrapper_name}_${e.name}`,n=(0,t.literal)(a[e.name]||"");return t.safeSql`
      do $$
      begin
        -- Old wrappers has an implicit dependency on pgsodium. For new wrappers
        -- we use Vault directly.
        if (select extversion from pg_extension where extname = 'wrappers') in (
          '0.1.0',
          '0.1.1',
          '0.1.4',
          '0.1.5',
          '0.1.6',
          '0.1.7',
          '0.1.8',
          '0.1.9',
          '0.1.10',
          '0.1.11',
          '0.1.12',
          '0.1.14',
          '0.1.15',
          '0.1.16',
          '0.1.17',
          '0.1.18',
          '0.1.19',
          '0.2.0',
          '0.3.0',
          '0.3.1',
          '0.4.0',
          '0.4.1',
          '0.4.2',
          '0.4.3',
          '0.4.4',
          '0.4.5'
        ) then
          create extension if not exists pgsodium;

          perform pgsodium.create_key(
            name := ${(0,t.literal)(r)}
          );

          perform vault.create_secret(
            new_secret := ${n},
            new_name   := ${(0,t.literal)(r)},
            new_key_id := (select id from pgsodium.valid_key where name = ${(0,t.literal)(r)})
          );
        else
          perform vault.create_secret(
            new_secret := ${n},
            new_name := ${(0,t.literal)(r)}
          );
        end if;
      end $$;
    `}),g=(0,t.joinSqlFragments)(p,"\n"),f=m.filter(e=>a[e.name]).map(e=>t.safeSql`${(0,t.ident)(e.name)} ''%s''`),_=u.filter(e=>a[e.name]),h=_.map(e=>t.safeSql`${(0,t.ident)(e.name)} %L`),b=(0,t.joinSqlFragments)([...f,...h],","),y=t.safeSql`
    do $$
    declare
      -- Old wrappers has an implicit dependency on pgsodium. For new wrappers
      -- we use Vault directly.
      is_using_old_wrappers bool;
      ${(0,t.joinSqlFragments)(m.map(e=>t.safeSql`${(0,t.ident)(`v_${e.name}`)} text;`),"\n")}
    begin
      is_using_old_wrappers := (select extversion from pg_extension where extname = 'wrappers') in (
        '0.1.0',
        '0.1.1',
        '0.1.4',
        '0.1.5',
        '0.1.6',
        '0.1.7',
        '0.1.8',
        '0.1.9',
        '0.1.10',
        '0.1.11',
        '0.1.12',
        '0.1.14',
        '0.1.15',
        '0.1.16',
        '0.1.17',
        '0.1.18',
        '0.1.19',
        '0.2.0',
        '0.3.0',
        '0.3.1',
        '0.4.0',
        '0.4.1',
        '0.4.2',
        '0.4.3',
        '0.4.4',
        '0.4.5'
      );
      ${(0,t.joinSqlFragments)(m.map(e=>t.safeSql`
              if is_using_old_wrappers then
                select id into ${(0,t.ident)(`v_${e.name}`)} from pgsodium.valid_key where name = ${(0,t.literal)(`${a.wrapper_name}_${e.name}`)} limit 1;
              else
                select id into ${(0,t.ident)(`v_${e.name}`)} from vault.secrets where name = ${(0,t.literal)(`${a.wrapper_name}_${e.name}`)} limit 1;
              end if;
            `),"\n")}
    
      execute format(
        E'create server ${(0,t.ident)(a.server_name)} foreign data wrapper ${(0,t.ident)(a.wrapper_name)} options (${b});',
        ${(0,t.joinSqlFragments)([...m.filter(e=>a[e.name]).map(e=>(0,t.ident)(`v_${e.name}`)),..._.map(e=>(0,t.literal)(a[e.name]))],",")}
      );
    end $$;
  `,S=(0,t.joinSqlFragments)(i.map(e=>{let r=e.columns;return t.safeSql`
        create foreign table ${(0,t.ident)(e.schema_name)}.${(0,t.ident)(e.table_name)} (
          ${(0,t.joinSqlFragments)(r.map(e=>t.safeSql`${(0,t.ident)(e.name)} ${(0,t.keyword)(e.type)}`),",")}
        )
        server ${(0,t.ident)(a.server_name)}
        options (
          ${(0,t.joinSqlFragments)(Object.entries(e).filter(([e,t])=>"table_name"!==e&&"schema_name"!==e&&"columns"!==e&&"index"!==e&&"is_new_schema"!==e&&!!t).map(([e,a])=>t.safeSql`${(0,t.ident)(e)} ${(0,t.literal)(a)}`),",")}
        );
      `}),"\n\n"),E=(0,t.joinSqlFragments)([...l,t.safeSql`strict 'true'`],", ");return t.safeSql`
    ${c}

    ${d}

    ${g}

    ${y}

    ${"tables"===n?S:t.safeSql``}

    ${"schema"===n?t.safeSql`
  import foreign schema ${(0,t.ident)(s)} from server ${(0,t.ident)(a.server_name)} into ${(0,t.ident)(o)} options (${E});
`:t.safeSql``}
  `}let n=({wrapper:e,wrapperMeta:a})=>{let r=a.server.options.filter(e=>e.encrypted).map(a=>{let r=`${e.name}_${a.name}`;return t.safeSql`
      do $$
      begin
        -- Old wrappers has an implicit dependency on pgsodium. For new wrappers
        -- we use Vault directly.
        if (select extversion from pg_extension where extname = 'wrappers') in (
          '0.1.0',
          '0.1.1',
          '0.1.4',
          '0.1.5',
          '0.1.6',
          '0.1.7',
          '0.1.8',
          '0.1.9',
          '0.1.10',
          '0.1.11',
          '0.1.12',
          '0.1.14',
          '0.1.15',
          '0.1.16',
          '0.1.17',
          '0.1.18',
          '0.1.19',
          '0.2.0',
          '0.3.0',
          '0.3.1',
          '0.4.0',
          '0.4.1',
          '0.4.2',
          '0.4.3',
          '0.4.4',
          '0.4.5'
        ) then
          delete from vault.secrets where key_id = (select id from pgsodium.valid_key where name = ${(0,t.literal)(r)});

          delete from pgsodium.key where name = ${(0,t.literal)(r)};
        else
          delete from vault.secrets where name = ${(0,t.literal)(r)};
        end if;
      end $$;
    `}),n=(0,t.joinSqlFragments)(r,"\n");return t.safeSql`
    drop foreign data wrapper if exists ${(0,t.ident)(e.name)} cascade;

    ${n}
  `};e.s(["getCreateFDWSql",0,r,"getDeleteFDWSql",0,n,"getDropForeignTableSql",0,function({schema:e,table:a}){return t.safeSql`
drop foreign table if exists ${(0,t.ident)(e)}.${(0,t.ident)(a)};
`},"getFDWsSql",0,a,"getImportForeignSchemaSql",0,function({serverName:e,sourceSchema:a,targetSchema:r,schemaOptions:n=[]}){let i=(0,t.joinSqlFragments)([...n,t.safeSql`strict 'true'`],", ");return t.safeSql`
  import foreign schema ${(0,t.ident)(a)} from server ${(0,t.ident)(e)} into ${(0,t.ident)(r)} options (${i});
`},"getUpdateFDWSql",0,({wrapper:e,wrapperMeta:a,formState:i,tables:s})=>{let o=n({wrapper:e,wrapperMeta:a}),l=r({wrapperMeta:a,formState:i,tables:s,mode:"tables",sourceSchema:"",targetSchema:""});return t.safeSql`
    ${o}

    ${l}
  `}],33942);var i=e.i(125356);let s={list:e=>["projects",e,"fdws"]};e.s(["fdwKeys",0,s],584258);var o=e.i(617361),l=e.i(681328);async function c({projectRef:e,connectionString:t},r){let n=a(),{result:i}=await (0,o.executeSql)({projectRef:e,connectionString:t,sql:n,queryKey:["fdws"]},r);return Array.isArray(i)?i:l.EMPTY_ARR}e.s(["getFDWs",0,c,"useFDWsQuery",0,({projectRef:e,connectionString:t},{enabled:a=!0,...r}={})=>(0,i.useQuery)({queryKey:s.list(e),queryFn:({signal:a})=>c({projectRef:e,connectionString:t},a),enabled:a&&void 0!==e,...r})],298625)}]);

//# debugId=c1fe5ab4-1dac-2ef1-43df-bf298f2be842