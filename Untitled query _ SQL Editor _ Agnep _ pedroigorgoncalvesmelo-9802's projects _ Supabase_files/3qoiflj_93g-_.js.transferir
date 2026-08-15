;!function(){try { var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof global?global:"undefined"!=typeof window?window:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&((e._debugIds|| (e._debugIds={}))[n]="47be05d4-52ba-a108-1050-f989140814f7")}catch(e){}}();
(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,46932,e=>{"use strict";e.s(["queryOptions",0,function(e){return e}])},938343,e=>{"use strict";e.s(["tableEditorKeys",0,{tableEditor:(e,t)=>["projects",e,"table-editor",t].filter(Boolean)}])},34479,664304,e=>{"use strict";e.i(850036);var t=e.i(479084);let n=({id:e,scoped:n=!1})=>e?n?t.safeSql`
    with base_table_info as (
        select
            c.oid::int8 as id,
            nc.nspname as schema,
            c.relname as name,
            c.relkind,
            c.relrowsecurity as rls_enabled,
            c.relforcerowsecurity as rls_forced,
            c.relreplident,
            c.relowner,
            obj_description(c.oid) as comment,
            fs.srvname as foreign_server_name,
            fdw.fdwname as foreign_data_wrapper_name,
            fdw_handler.proname as foreign_data_wrapper_handler
        from pg_class c
        join pg_namespace nc on nc.oid = c.relnamespace
        left join pg_foreign_table ft on ft.ftrelid = c.oid
        left join pg_foreign_server fs on fs.oid = ft.ftserver
        left join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
        left join pg_proc fdw_handler on fdw.fdwhandler = fdw_handler.oid
        where c.oid = ${(0,t.literal)(e)}
            and not pg_is_other_temp_schema(nc.oid)
            and (
                pg_has_role(c.relowner, 'USAGE')
                or has_table_privilege(
                    c.oid,
                    'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
                )
                or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
            )
    ),
    table_stats as (
        select
            b.id,
            case
                when b.relreplident = 'd' then 'DEFAULT'
                when b.relreplident = 'i' then 'INDEX'
                when b.relreplident = 'f' then 'FULL'
                else 'NOTHING'
            end as replica_identity,
            pg_total_relation_size(format('%I.%I', b.schema, b.name))::int8 as bytes,
            pg_size_pretty(pg_total_relation_size(format('%I.%I', b.schema, b.name))) as size,
            pg_stat_get_live_tuples(b.id) as live_rows_estimate,
            pg_stat_get_dead_tuples(b.id) as dead_rows_estimate
        from base_table_info b
        where b.relkind in ('r', 'p')
    ),
    primary_keys as (
        select
            i.indrelid as table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', i.indrelid::int8,
                    'name', a.attname
                )
                order by array_position(i.indkey, a.attnum)
            ) as primary_keys
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_namespace n on c.relnamespace = n.oid
		join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
        where i.indisprimary
            and i.indrelid = ${(0,t.literal)(e)}
        group by i.indrelid
    ),
    index_cols as (
        select
            i.indrelid as table_id,
            i.indkey,
            array_agg(
                a.attname
                order by array_position(i.indkey, a.attnum)
            ) as columns
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_attribute a on a.attrelid = c.oid
            and a.attnum = any(i.indkey)
        where i.indisunique
            and i.indisprimary = false
            and i.indrelid = ${(0,t.literal)(e)}
        group by i.indrelid, i.indkey
    ),
    unique_indexes as (
        select
            ic.table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', ic.table_id::int8,
                    'columns', ic.columns
                )
            ) as unique_indexes
        from index_cols ic
        join pg_class c on c.oid = ic.table_id
        join pg_namespace n on n.oid = c.relnamespace
        group by ic.table_id
    ),
    relationships as (
        select
            c.conrelid as source_id,
            c.confrelid as target_id,
            jsonb_build_object(
                'id', c.oid::int8,
                'constraint_name', c.conname,
                'deletion_action', c.confdeltype,
                'update_action', c.confupdtype,
                'source_schema', nsa.nspname,
                'source_table_name', csa.relname,
                'source_column_name', sa.attname,
                'target_table_schema', nta.nspname,
                'target_table_name', cta.relname,
                'target_column_name', ta.attname
            ) as rel_info
        from pg_constraint c
        join pg_class csa on c.conrelid = csa.oid
        join pg_namespace nsa on csa.relnamespace = nsa.oid
        join pg_attribute sa on (sa.attrelid = c.conrelid and sa.attnum = any(c.conkey))
        join pg_class cta on c.confrelid = cta.oid
        join pg_namespace nta on cta.relnamespace = nta.oid
        join pg_attribute ta on (ta.attrelid = c.confrelid and ta.attnum = any(c.confkey))
        where c.contype = 'f'
            and (c.conrelid = ${(0,t.literal)(e)} or c.confrelid = ${(0,t.literal)(e)})
    ),
    columns as (
        select
            a.attrelid as table_id,
            jsonb_agg(jsonb_build_object(
                'id', (a.attrelid || '.' || a.attnum),
                'table_id', c.oid::int8,
                'schema', nc.nspname,
                'table', c.relname,
                'ordinal_position', a.attnum,
                'name', a.attname,
                'default_value', case
                    when a.atthasdef then pg_get_expr(ad.adbin, ad.adrelid)
                    else null
                end,
                'data_type', case
                    when t.typtype = 'd' then
                        case
                            when bt.typelem <> 0::oid and bt.typlen = -1 then 'ARRAY'
                            when nbt.nspname = 'pg_catalog' then format_type(t.typbasetype, null)
                            else 'USER-DEFINED'
                        end
                    else
                        case
                            when t.typelem <> 0::oid and t.typlen = -1 then 'ARRAY'
                            when nt.nspname = 'pg_catalog' then format_type(a.atttypid, null)
                            else 'USER-DEFINED'
                        end
                end,
                'format', coalesce(bt.typname, t.typname),
                'format_schema', coalesce(nbt.nspname, nt.nspname),
                'is_identity', a.attidentity in ('a', 'd'),
                'identity_generation', case a.attidentity
                    when 'a' then 'ALWAYS'
                    when 'd' then 'BY DEFAULT'
                    else null
                end,
                'is_generated', a.attgenerated in ('s'),
                'is_nullable', not (a.attnotnull or t.typtype = 'd' and t.typnotnull),
                'is_updatable', (
                    b.relkind in ('r', 'p') or
                    (b.relkind in ('v', 'f') and pg_column_is_updatable(b.id, a.attnum, false))
                ),
                'is_unique', uniques.table_id is not null,
                'check', check_constraints.definition,
                'comment', col_description(c.oid, a.attnum),
                'enums', coalesce(
                    (
                        select jsonb_agg(e.enumlabel order by e.enumsortorder)
                        from pg_catalog.pg_enum e
                        where e.enumtypid = coalesce(bt.oid, t.oid)
                            or e.enumtypid = coalesce(bt.typelem, t.typelem)
                    ),
                    '[]'::jsonb
                )
            ) order by a.attnum) as columns
        from pg_attribute a
        join base_table_info b on a.attrelid = b.id
        join pg_class c on a.attrelid = c.oid
        join pg_namespace nc on c.relnamespace = nc.oid
        left join pg_attrdef ad on (a.attrelid = ad.adrelid and a.attnum = ad.adnum)
        join pg_type t on a.atttypid = t.oid
        join pg_namespace nt on t.typnamespace = nt.oid
        left join pg_type bt on (t.typtype = 'd' and t.typbasetype = bt.oid)
        left join pg_namespace nbt on bt.typnamespace = nbt.oid
        left join (
            select
                conrelid as table_id,
                conkey[1] as ordinal_position
            from pg_catalog.pg_constraint
            where contype = 'u' and cardinality(conkey) = 1
                and conrelid = ${(0,t.literal)(e)}
            group by conrelid, conkey[1]
        ) as uniques on uniques.table_id = a.attrelid and uniques.ordinal_position = a.attnum
        left join (
            select distinct on (conrelid, conkey[1])
                conrelid as table_id,
                conkey[1] as ordinal_position,
                substring(
                    pg_get_constraintdef(oid, true),
                    8,
                    length(pg_get_constraintdef(oid, true)) - 8
                ) as definition
            from pg_constraint
            where contype = 'c' and cardinality(conkey) = 1
                and conrelid = ${(0,t.literal)(e)}
            order by conrelid, conkey[1], oid asc
        ) as check_constraints on check_constraints.table_id = a.attrelid
                            and check_constraints.ordinal_position = a.attnum
        where a.attnum > 0
        and not a.attisdropped
        group by a.attrelid
    )
    select
        case b.relkind
            when 'r' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'p' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'v' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_updatable', (pg_relation_is_updatable(b.id, false) & 20) = 20,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'm' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_populated', true,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'f' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'comment', b.comment,
                'foreign_server_name', b.foreign_server_name,
                'foreign_data_wrapper_name', b.foreign_data_wrapper_name,
                'foreign_data_wrapper_handler', b.foreign_data_wrapper_handler,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
        end as entity
    from base_table_info b
    left join table_stats ts on b.id = ts.id
    left join primary_keys pk on b.id = pk.table_id
    left join unique_indexes ui on b.id = ui.table_id
    left join columns c on b.id = c.table_id;
  `:t.safeSql`
    -- FROZEN legacy path (pgMetaScopedIntrospection off): do not edit -- it must
    -- keep matching production behavior until the flag cleanup deletes it.
    with base_table_info as (
        select
            c.oid::int8 as id,
            nc.nspname as schema,
            c.relname as name,
            c.relkind,
            c.relrowsecurity as rls_enabled,
            c.relforcerowsecurity as rls_forced,
            c.relreplident,
            c.relowner,
            obj_description(c.oid) as comment,
            fs.srvname as foreign_server_name,
            fdw.fdwname as foreign_data_wrapper_name,
            fdw_handler.proname as foreign_data_wrapper_handler
        from pg_class c
        join pg_namespace nc on nc.oid = c.relnamespace
        left join pg_foreign_table ft on ft.ftrelid = c.oid
        left join pg_foreign_server fs on fs.oid = ft.ftserver
        left join pg_foreign_data_wrapper fdw on fdw.oid = fs.srvfdw
        left join pg_proc fdw_handler on fdw.fdwhandler = fdw_handler.oid
        where c.oid = ${(0,t.literal)(e)}
            and not pg_is_other_temp_schema(nc.oid)
            and (
                pg_has_role(c.relowner, 'USAGE')
                or has_table_privilege(
                    c.oid,
                    'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER'
                )
                or has_any_column_privilege(c.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
            )
    ),
    table_stats as (
        select
            b.id,
            case
                when b.relreplident = 'd' then 'DEFAULT'
                when b.relreplident = 'i' then 'INDEX'
                when b.relreplident = 'f' then 'FULL'
                else 'NOTHING'
            end as replica_identity,
            pg_total_relation_size(format('%I.%I', b.schema, b.name))::int8 as bytes,
            pg_size_pretty(pg_total_relation_size(format('%I.%I', b.schema, b.name))) as size,
            pg_stat_get_live_tuples(b.id) as live_rows_estimate,
            pg_stat_get_dead_tuples(b.id) as dead_rows_estimate
        from base_table_info b
        where b.relkind in ('r', 'p')
    ),
    primary_keys as (
        select
            i.indrelid as table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', i.indrelid::int8,
                    'name', a.attname
                )
                order by array_position(i.indkey, a.attnum)
            ) as primary_keys
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_namespace n on c.relnamespace = n.oid
		join pg_attribute a on a.attrelid = c.oid and a.attnum = any(i.indkey)
        where i.indisprimary
        group by i.indrelid
    ),
    index_cols as (
        select
            i.indrelid as table_id,
            i.indkey,
            array_agg(
                a.attname
                order by array_position(i.indkey, a.attnum)
            ) as columns
        from pg_index i
        join pg_class c on i.indrelid = c.oid
        join pg_attribute a on a.attrelid = c.oid
            and a.attnum = any(i.indkey)
        where i.indisunique
            and i.indisprimary = false
        group by i.indrelid, i.indkey
    ),
    unique_indexes as (
        select
            ic.table_id,
            jsonb_agg(
                jsonb_build_object(
                    'schema', n.nspname,
                    'table_name', c.relname,
                    'table_id', ic.table_id::int8,
                    'columns', ic.columns
                )
            ) as unique_indexes
        from index_cols ic
        join pg_class c on c.oid = ic.table_id
        join pg_namespace n on n.oid = c.relnamespace
        group by ic.table_id
    ),
    relationships as (
        select
            c.conrelid as source_id,
            c.confrelid as target_id,
            jsonb_build_object(
                'id', c.oid::int8,
                'constraint_name', c.conname,
                'deletion_action', c.confdeltype,
                'update_action', c.confupdtype,
                'source_schema', nsa.nspname,
                'source_table_name', csa.relname,
                'source_column_name', sa.attname,
                'target_table_schema', nta.nspname,
                'target_table_name', cta.relname,
                'target_column_name', ta.attname
            ) as rel_info
        from pg_constraint c
        join pg_class csa on c.conrelid = csa.oid
        join pg_namespace nsa on csa.relnamespace = nsa.oid
        join pg_attribute sa on (sa.attrelid = c.conrelid and sa.attnum = any(c.conkey))
        join pg_class cta on c.confrelid = cta.oid
        join pg_namespace nta on cta.relnamespace = nta.oid
        join pg_attribute ta on (ta.attrelid = c.confrelid and ta.attnum = any(c.confkey))
        where c.contype = 'f'
    ),
    columns as (
        select
            a.attrelid as table_id,
            jsonb_agg(jsonb_build_object(
                'id', (a.attrelid || '.' || a.attnum),
                'table_id', c.oid::int8,
                'schema', nc.nspname,
                'table', c.relname,
                'ordinal_position', a.attnum,
                'name', a.attname,
                'default_value', case
                    when a.atthasdef then pg_get_expr(ad.adbin, ad.adrelid)
                    else null
                end,
                'data_type', case
                    when t.typtype = 'd' then
                        case
                            when bt.typelem <> 0::oid and bt.typlen = -1 then 'ARRAY'
                            when nbt.nspname = 'pg_catalog' then format_type(t.typbasetype, null)
                            else 'USER-DEFINED'
                        end
                    else
                        case
                            when t.typelem <> 0::oid and t.typlen = -1 then 'ARRAY'
                            when nt.nspname = 'pg_catalog' then format_type(a.atttypid, null)
                            else 'USER-DEFINED'
                        end
                end,
                'format', coalesce(bt.typname, t.typname),
                'format_schema', coalesce(nbt.nspname, nt.nspname),
                'is_identity', a.attidentity in ('a', 'd'),
                'identity_generation', case a.attidentity
                    when 'a' then 'ALWAYS'
                    when 'd' then 'BY DEFAULT'
                    else null
                end,
                'is_generated', a.attgenerated in ('s'),
                'is_nullable', not (a.attnotnull or t.typtype = 'd' and t.typnotnull),
                'is_updatable', (
                    b.relkind in ('r', 'p') or
                    (b.relkind in ('v', 'f') and pg_column_is_updatable(b.id, a.attnum, false))
                ),
                'is_unique', uniques.table_id is not null,
                'check', check_constraints.definition,
                'comment', col_description(c.oid, a.attnum),
                'enums', coalesce(
                    (
                        select jsonb_agg(e.enumlabel order by e.enumsortorder)
                        from pg_catalog.pg_enum e
                        where e.enumtypid = coalesce(bt.oid, t.oid)
                            or e.enumtypid = coalesce(bt.typelem, t.typelem)
                    ),
                    '[]'::jsonb
                )
            ) order by a.attnum) as columns
        from pg_attribute a
        join base_table_info b on a.attrelid = b.id
        join pg_class c on a.attrelid = c.oid
        join pg_namespace nc on c.relnamespace = nc.oid
        left join pg_attrdef ad on (a.attrelid = ad.adrelid and a.attnum = ad.adnum)
        join pg_type t on a.atttypid = t.oid
        join pg_namespace nt on t.typnamespace = nt.oid
        left join pg_type bt on (t.typtype = 'd' and t.typbasetype = bt.oid)
        left join pg_namespace nbt on bt.typnamespace = nbt.oid
        left join (
            select
                conrelid as table_id,
                conkey[1] as ordinal_position
            from pg_catalog.pg_constraint
            where contype = 'u' and cardinality(conkey) = 1
            group by conrelid, conkey[1]
        ) as uniques on uniques.table_id = a.attrelid and uniques.ordinal_position = a.attnum
        left join (
            select distinct on (conrelid, conkey[1])
                conrelid as table_id,
                conkey[1] as ordinal_position,
                substring(
                    pg_get_constraintdef(oid, true),
                    8,
                    length(pg_get_constraintdef(oid, true)) - 8
                ) as definition
            from pg_constraint
            where contype = 'c' and cardinality(conkey) = 1
            order by conrelid, conkey[1], oid asc
        ) as check_constraints on check_constraints.table_id = a.attrelid
                            and check_constraints.ordinal_position = a.attnum
        where a.attnum > 0
        and not a.attisdropped
        group by a.attrelid
    )
    select
        case b.relkind
            when 'r' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'p' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'rls_enabled', b.rls_enabled,
                'rls_forced', b.rls_forced,
                'replica_identity', ts.replica_identity,
                'bytes', ts.bytes,
                'size', ts.size,
                'live_rows_estimate', ts.live_rows_estimate,
                'dead_rows_estimate', ts.dead_rows_estimate,
                'comment', b.comment,
                'primary_keys', coalesce(pk.primary_keys, '[]'::jsonb),
                'unique_indexes', coalesce(ui.unique_indexes, '[]'::jsonb),
                'relationships', coalesce(
                    (select jsonb_agg(r.rel_info)
                    from relationships r
                    where r.source_id = b.id or r.target_id = b.id),
                    '[]'::jsonb
                ),
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'v' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_updatable', (pg_relation_is_updatable(b.id, false) & 20) = 20,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'm' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'is_populated', true,
                'comment', b.comment,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
            when 'f' then jsonb_build_object(
                'entity_type', b.relkind,
                'id', b.id,
                'schema', b.schema,
                'name', b.name,
                'comment', b.comment,
                'foreign_server_name', b.foreign_server_name,
                'foreign_data_wrapper_name', b.foreign_data_wrapper_name,
                'foreign_data_wrapper_handler', b.foreign_data_wrapper_handler,
                'columns', coalesce(c.columns, '[]'::jsonb)
            )
        end as entity
    from base_table_info b
    left join table_stats ts on b.id = ts.id
    left join primary_keys pk on b.id = pk.table_id
    left join unique_indexes ui on b.id = ui.table_id
    left join columns c on b.id = c.table_id;
  `:t.safeSql``;e.s(["getDuplicateRowsSQL",0,({duplicatedTableName:e,sourceTableName:n,sourceTableSchema:a})=>t.safeSql`INSERT INTO ${(0,t.ident)(a)}.${(0,t.ident)(e)} SELECT * FROM ${(0,t.ident)(a)}.${(0,t.ident)(n)};`,"getDuplicateTableSQL",0,({comment:e,duplicatedTableName:n,sourceTableName:a,sourceTableSchema:i})=>{let o=t.safeSql`CREATE TABLE ${(0,t.ident)(i)}.${(0,t.ident)(n)} (LIKE ${(0,t.ident)(i)}.${(0,t.ident)(a)} INCLUDING ALL);`,r=void 0!=e?t.safeSql`comment on table ${(0,t.ident)(i)}.${(0,t.ident)(n)} is ${(0,t.literal)(e)};`:t.safeSql``;return(0,t.joinSqlFragments)([o,r],"\n")},"getTableEditorSql",0,n],664304);var a=e.i(46932),i=e.i(125356);e.i(128328);var o=e.i(657588),r=e.i(938343),s=e.i(617361);let l="pgMetaScopedIntrospection";async function d({projectRef:e,connectionString:t,id:a,scoped:i=!1},o){if(!a)throw Error("id is required");let r=n({id:a,scoped:i}),{result:l}=await (0,s.executeSql)({projectRef:e,connectionString:t,sql:r,queryKey:["table-editor",a]},o);return l[0]?.entity??null}let c=({projectRef:e,connectionString:t,id:n,scoped:i})=>(0,a.queryOptions)({queryKey:[...r.tableEditorKeys.tableEditor(e,n),{scoped:!!i}],queryFn:({signal:a})=>d({projectRef:e,connectionString:t,id:n,scoped:i},a)});e.s(["PG_META_SCOPED_INTROSPECTION_FLAG",0,l,"getTableEditor",0,d,"prefetchTableEditor",0,function(e,{projectRef:t,connectionString:n,id:a,scoped:i}){return e.fetchQuery(c({projectRef:t,connectionString:n,id:a,scoped:i}))},"tableEditorQueryOptions",0,c,"useTableEditorQuery",0,({projectRef:e,connectionString:t,id:n},{enabled:a=!0,...r}={})=>{let s=!!(0,o.useFlag)(l);return(0,i.useQuery)({...c({projectRef:e,connectionString:t,id:n,scoped:s}),enabled:a&&void 0!==e&&void 0!==n&&!isNaN(n),refetchOnWindowFocus:!1,refetchOnMount:!1,staleTime:3e5,...r})}],34479)},309584,e=>{"use strict";e.i(128328);var t=e.i(657588),n=e.i(416340),a=e.i(34479),i=e.i(10429);let o=!1,r=!1,s=!1,l=()=>{},d=new Promise(e=>{l=e}),c=()=>{r||(r=!0,l())};e.s(["isScopedIntrospection",0,()=>o,"scopedIntrospectionReady",0,()=>(s||(s=!0,setTimeout(c,5e3)),d),"useSyncScopedIntrospection",0,()=>{let{hasLoaded:e}=(0,t.useFeatureFlags)(),r=!!(0,t.useFlag)(a.PG_META_SCOPED_INTROSPECTION_FLAG);(0,n.useEffect)(()=>{o=r,(e||!i.IS_PLATFORM)&&c()},[r,e])}])},608793,e=>{"use strict";let t="u"<typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__;e.s(["DEBUG_BUILD",0,t])},342474,(e,t,n)=>{"use strict";t.exports=["chrome 111","edge 111","firefox 111","safari 16.4"]},350916,(e,t,n)=>{"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={UNDERSCORE_GLOBAL_ERROR_ROUTE:function(){return s},UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY:function(){return l},UNDERSCORE_NOT_FOUND_ROUTE:function(){return o},UNDERSCORE_NOT_FOUND_ROUTE_ENTRY:function(){return r}};for(var i in a)Object.defineProperty(n,i,{enumerable:!0,get:a[i]});let o="/_not-found",r=`${o}/page`,s="/_global-error",l=`${s}/page`},798119,(e,t,n)=>{"use strict";var a,i=e.i(302016);Object.defineProperty(n,"__esModule",{value:!0});var o={APP_CLIENT_INTERNALS:function(){return en},APP_PATHS_MANIFEST:function(){return T},APP_PATH_ROUTES_MANIFEST:function(){return h},AdapterOutputType:function(){return _},BARREL_OPTIMIZATION_PREFIX:function(){return z},BLOCKED_PAGES:function(){return W},BUILD_ID_FILE:function(){return B},BUILD_MANIFEST:function(){return R},CLIENT_PUBLIC_FILES_PATH:function(){return G},CLIENT_REFERENCE_MANIFEST:function(){return H},CLIENT_STATIC_FILES_PATH:function(){return $},CLIENT_STATIC_FILES_RUNTIME_MAIN:function(){return ee},CLIENT_STATIC_FILES_RUNTIME_MAIN_APP:function(){return et},CLIENT_STATIC_FILES_RUNTIME_POLYFILLS:function(){return eo},CLIENT_STATIC_FILES_RUNTIME_POLYFILLS_SYMBOL:function(){return er},CLIENT_STATIC_FILES_RUNTIME_REACT_REFRESH:function(){return ea},CLIENT_STATIC_FILES_RUNTIME_WEBPACK:function(){return ei},COMPILER_INDEXES:function(){return c},COMPILER_NAMES:function(){return d},CONFIG_FILES:function(){return q},DEFAULT_RUNTIME_WEBPACK:function(){return es},DEFAULT_SANS_SERIF_FONT:function(){return ep},DEFAULT_SERIF_FONT:function(){return e_},DEV_CLIENT_MIDDLEWARE_MANIFEST:function(){return F},DEV_CLIENT_PAGES_MANIFEST:function(){return P},DYNAMIC_CSS_MANIFEST:function(){return J},EDGE_RUNTIME_WEBPACK:function(){return el},EDGE_UNSUPPORTED_NODE_APIS:function(){return eE},EXPORT_DETAIL:function(){return j},EXPORT_MARKER:function(){return N},FUNCTIONS_CONFIG_MANIFEST:function(){return I},IMAGES_MANIFEST:function(){return C},INTERCEPTION_ROUTE_REWRITE_MANIFEST:function(){return Z},MIDDLEWARE_BUILD_MANIFEST:function(){return K},MIDDLEWARE_MANIFEST:function(){return U},MIDDLEWARE_REACT_LOADABLE_MANIFEST:function(){return X},MODERN_BROWSERSLIST_TARGET:function(){return s.default},NEXT_BUILTIN_DOCUMENT:function(){return Y},NEXT_FONT_MANIFEST:function(){return w},PAGES_MANIFEST:function(){return g},PHASE_ANALYZE:function(){return u},PHASE_DEVELOPMENT_SERVER:function(){return f},PHASE_EXPORT:function(){return p},PHASE_INFO:function(){return y},PHASE_PRODUCTION_BUILD:function(){return m},PHASE_PRODUCTION_SERVER:function(){return b},PHASE_TEST:function(){return E},PREFETCH_HINTS:function(){return O},PRERENDER_MANIFEST:function(){return D},REACT_LOADABLE_MANIFEST:function(){return M},ROUTES_MANIFEST:function(){return A},RSC_MODULE_TYPES:function(){return ef},SERVER_DIRECTORY:function(){return x},SERVER_FILES_MANIFEST:function(){return L},SERVER_PROPS_ID:function(){return ec},SERVER_REFERENCE_MANIFEST:function(){return V},STATIC_PROPS_ID:function(){return ed},STATIC_STATUS_PAGES:function(){return eu},STRING_LITERAL_DROP_BUNDLE:function(){return Q},SUBRESOURCE_INTEGRITY_MANIFEST:function(){return S},SYSTEM_ENTRYPOINTS:function(){return ey},TRACE_OUTPUT_VERSION:function(){return em},TURBOPACK_CLIENT_BUILD_MANIFEST:function(){return k},TURBOPACK_CLIENT_MIDDLEWARE_MANIFEST:function(){return v},TURBO_TRACE_DEFAULT_MEMORY_LIMIT:function(){return eb},UNDERSCORE_GLOBAL_ERROR_ROUTE:function(){return l.UNDERSCORE_GLOBAL_ERROR_ROUTE},UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY:function(){return l.UNDERSCORE_GLOBAL_ERROR_ROUTE_ENTRY},UNDERSCORE_NOT_FOUND_ROUTE:function(){return l.UNDERSCORE_NOT_FOUND_ROUTE},UNDERSCORE_NOT_FOUND_ROUTE_ENTRY:function(){return l.UNDERSCORE_NOT_FOUND_ROUTE_ENTRY}};for(var r in o)Object.defineProperty(n,r,{enumerable:!0,get:o[r]});let s=e.r(2879)._(e.r(342474)),l=e.r(350916),d={client:"client",server:"server",edgeServer:"edge-server"},c={[d.client]:0,[d.server]:1,[d.edgeServer]:2};var _=((a={}).PAGES="PAGES",a.PAGES_API="PAGES_API",a.APP_PAGE="APP_PAGE",a.APP_ROUTE="APP_ROUTE",a.PRERENDER="PRERENDER",a.STATIC_FILE="STATIC_FILE",a.MIDDLEWARE="MIDDLEWARE",a);let p="phase-export",u="phase-analyze",m="phase-production-build",b="phase-production-server",f="phase-development-server",E="phase-test",y="phase-info",g="pages-manifest.json",T="app-paths-manifest.json",h="app-path-routes-manifest.json",R="build-manifest.json",I="functions-config-manifest.json",S="subresource-integrity-manifest",w="next-font-manifest",N="export-marker.json",j="export-detail.json",D="prerender-manifest.json",O="prefetch-hints.json",A="routes-manifest.json",C="images-manifest.json",L="required-server-files",P="_devPagesManifest.json",U="middleware-manifest.json",v="_clientMiddlewareManifest.js",k="client-build-manifest.json",F="_devMiddlewareManifest.json",M="react-loadable-manifest.json",x="server",q=["next.config.js","next.config.mjs","next.config.ts",...i.default?.features?.typescript?["next.config.mts"]:[]],B="BUILD_ID",W=["/_document","/_app","/_error"],G="public",$="static",Q="__NEXT_DROP_CLIENT_FILE__",Y="__NEXT_BUILTIN_DOCUMENT__",z="__barrel_optimize__",H="client-reference-manifest",V="server-reference-manifest",K="middleware-build-manifest",X="middleware-react-loadable-manifest",Z="interception-route-rewrite-manifest",J="dynamic-css-manifest",ee="main",et=`${ee}-app`,en="app-pages-internals",ea="react-refresh",ei="webpack",eo="polyfills",er=Symbol(eo),es="webpack-runtime",el="edge-runtime-webpack",ed="__N_SSG",ec="__N_SSP",e_={name:"Times New Roman",xAvgCharWidth:821,azAvgWidth:854.3953488372093,unitsPerEm:2048},ep={name:"Arial",xAvgCharWidth:904,azAvgWidth:934.5116279069767,unitsPerEm:2048},eu=["/500"],em=1,eb=6e3,ef={client:"client",server:"server"},eE=["clearImmediate","setImmediate","BroadcastChannel","ByteLengthQueuingStrategy","CompressionStream","CountQueuingStrategy","DecompressionStream","DomException","MessageChannel","MessageEvent","MessagePort","ReadableByteStreamController","ReadableStreamBYOBRequest","ReadableStreamDefaultController","TransformStreamDefaultController","WritableStreamDefaultController"],ey=new Set([ee,ea,et]);("function"==typeof n.default||"object"==typeof n.default&&null!==n.default)&&void 0===n.default.__esModule&&(Object.defineProperty(n.default,"__esModule",{value:!0}),Object.assign(n.default,n),t.exports=n.default)},613923,(e,t,n)=>{t.exports=e.r(798119)},636047,726973,3694,859791,623705,e=>{"use strict";var t,n=e.i(221628),a=e.i(988829),i=e.i(934806),o=e.i(827157),r=e.i(608793),s=e.i(302016),l=e.i(613923);function d(e,t){let n,d;return(n=s.default.env.NEXT_PHASE===l.PHASE_PRODUCTION_BUILD,(d=!!t&&function(e){if(e.$$typeof!==Symbol.for("react.server.reference"))return!1;let{type:t}=function(e){let t=parseInt(e.slice(0,2),16),n=t>>1&63,a=Array(6);for(let e=0;e<6;e++){let t=n>>5-e&1;a[e]=1===t}return{type:1==(t>>7&1)?"use-cache":"server-action",usedArgs:a,hasRestArgs:1==(1&t)}}(e.$$id);return"use-cache"===t}(t))&&r.DEBUG_BUILD&&i.debug.log("Skipping span creation in Cache Components context"),n||d)?t(new o.SentryNonRecordingSpan({traceId:"00000000000000000000000000000000",spanId:"0000000000000000"})):(0,a.startSpan)(e,t)}e.s(["startSpan",0,d],726973),e.i(128328);var c=e.i(298650),_=e.i(416340),p=e.i(801026),u=e.i(813663),m=((t={}).EDIT_CELL_CONTENT="edit_cell_content",t.ADD_ROW="add_row",t.DELETE_ROW="delete_row",t);function b(e){return"delete_row"===e.type}function f(e){return"edit_cell_content"===e.type}e.s(["QueuedOperationType",()=>m,"isAddRowOperation",0,function(e){return"add_row"===e.type},"isDeleteRowOperation",0,b,"isEditCellContentOperation",0,f],3694);var E=e.i(824183);function y(e){return"__tempId"in e&&"string"==typeof e.__tempId}e.s(["isPendingAddRow",0,y,"isPendingDeleteRow",0,function(e){return"__isDeleted"in e&&!0===e.__isDeleted}],859791);var g=e.i(962217),T=e.i(48189);let h="__originalRowIdentifiers";function R(e,t){let n=e[h];return{...(0,T.isObject)(n)?n:t}}function I(e,t){return{...e,[h]:{...t}}}function S(e){if(e.type===m.EDIT_CELL_CONTENT){let{columnName:t,rowIdentifiers:n}=e.payload,a=Object.entries(n).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>`${e}:${t}`).join("|");return`${e.type}:${e.tableId}:${t}:${a}`}if(e.type===m.ADD_ROW)return`${e.type}:${e.tableId}:${e.payload.tempId}`;if(e.type===m.DELETE_ROW){let{rowIdentifiers:t}=e.payload,n=Object.entries(t).sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>`${e}:${t}`).join("|");return`${e.type}:${e.tableId}:${n}`}throw Error(`Unknown operation type: ${e.type}`)}function w(e,t){let n=Object.entries(t);return 0!==n.length&&n.every(([t,n])=>e[t]===n)}function N(e,t){let n=e[h];return w((0,T.isObject)(n)?n:e,t)}e.s(["formatGridDataWithOperationValues",0,({operations:e,rows:t})=>{let n=t.slice();return e.forEach(e=>{if(e.type===m.EDIT_CELL_CONTENT){let{rowIdentifiers:t,columnName:a,newValue:i}=e.payload,o=n.findIndex(e=>N(e,t));-1!==o&&(n[o]=I({...n[o],[a]:i},t))}else if(e.type===m.ADD_ROW){let{tempId:t,rowData:a}=e.payload,i=Number(t),o=n.findIndex(e=>y(e)&&e.__tempId===t);if(o>=0)n[o]={...n[o],...a,__tempId:t};else{let e={...a,idx:i,__tempId:t};n.unshift(e)}}else if(e.type===m.DELETE_ROW){let{rowIdentifiers:t}=e.payload,a=n.findIndex(e=>N(e,t));-1!==a&&(n[a]=I({...n[a],__isDeleted:!0},t))}}),n},"generateTableChangeKey",0,S,"getStableRowIdentifiers",0,R,"queueCellEditWithOptimisticUpdate",0,function({queueOperation:e,tableId:t,table:n,row:a,rowIdentifiers:i,columnName:o,oldValue:r,newValue:s,enumArrayColumns:l}){let d=R(a,i);y(a)&&(d.__tempId=a.__tempId),e({type:m.EDIT_CELL_CONTENT,tableId:t,payload:{rowIdentifiers:d,columnName:o,oldValue:r,newValue:s,table:n,enumArrayColumns:l}})},"queueRowAddWithOptimisticUpdate",0,function({queueOperation:e,tableId:t,table:n,rowData:a,enumArrayColumns:i}){let o=String(-Date.now());e({type:m.ADD_ROW,tableId:t,payload:{tempId:o,rowData:a,table:n,enumArrayColumns:i}})},"queueRowDeletesWithOptimisticUpdate",0,function({rows:e,table:t,queueOperation:n,projectRef:a}){if(!a)return void console.error("Cannot queue row deletes: projectRef is required");if(!(0,g.isTableLike)(t))return void console.error("Cannot queue row deletes: table must be a TableLike entity");if(0===t.primary_keys.length)return void console.error("Cannot queue row deletes: table has no primary keys");for(let a of e){let e={};t.primary_keys.forEach(t=>{e[t.name]=a[t.name]});let i=R(a,e);y(a)&&(i.__tempId=a.__tempId),n({type:m.DELETE_ROW,tableId:t.id,payload:{rowIdentifiers:i,originalRow:a,table:t}})}},"rowMatchesIdentifiers",0,w],623705);let j=()=>{let e=(0,p.proxy)({rowsPerPage:100,setRowsPerPage:t=>{e.rowsPerPage=t},ui:{open:"none"},get sidePanel(){return"side-panel"===e.ui.open?e.ui.sidePanel:void 0},get confirmationDialog(){return"confirmation-dialog"===e.ui.open?e.ui.confirmationDialog:void 0},closeSidePanel:()=>{e.ui={open:"none"}},closeConfirmationDialog:()=>{e.ui={open:"none"}},onAddSchema:()=>{e.ui={open:"side-panel",sidePanel:{type:"schema",mode:"new"}}},onAddTable:t=>{d({name:"table_creator.opened",op:"ui.action"},e=>{e.setAttribute("table_creator.opened",1)}),e.ui={open:"side-panel",sidePanel:{type:"table",mode:"new",templateData:t}}},onEditTable:()=>{e.ui={open:"side-panel",sidePanel:{type:"table",mode:"edit"}}},onDuplicateTable:()=>{e.ui={open:"side-panel",sidePanel:{type:"table",mode:"duplicate"}}},onDeleteTable:()=>{e.ui={open:"confirmation-dialog",confirmationDialog:{type:"table",isDeleteWithCascade:!1}}},onDeleteView:()=>{e.ui={open:"confirmation-dialog",confirmationDialog:{type:"view",isDeleteWithCascade:!1}}},onDeleteMaterializedView:()=>{e.ui={open:"confirmation-dialog",confirmationDialog:{type:"materialized-view",isDeleteWithCascade:!1}}},onAddColumn:()=>{e.ui={open:"side-panel",sidePanel:{type:"column"}}},onEditColumn:t=>{e.ui={open:"side-panel",sidePanel:{type:"column",column:t}}},onDeleteColumn:t=>{e.ui={open:"confirmation-dialog",confirmationDialog:{type:"column",column:t,isDeleteWithCascade:!1}}},onAddRow:()=>{e.ui={open:"side-panel",sidePanel:{type:"row"}}},onEditRow:t=>{e.ui={open:"side-panel",sidePanel:{type:"row",row:t}}},onDeleteRows:(t,n={numRows:0,allRowsSelected:!1,callback:()=>{}})=>{let{numRows:a,allRowsSelected:i,callback:o}=n;e.ui={open:"confirmation-dialog",confirmationDialog:{type:"row",rows:t,numRows:a,allRowsSelected:i,callback:o}}},onExpandJSONEditor:t=>{e.ui={open:"side-panel",sidePanel:{type:"json",jsonValue:t}}},onExpandTextEditor:(t,n)=>{e.ui={open:"side-panel",sidePanel:{type:"cell",value:{column:t,row:n}}}},onEditForeignKeyColumnValue:t=>{e.ui={open:"side-panel",sidePanel:{type:"foreign-row-selector",foreignKey:t}}},onImportData:t=>{e.ui={open:"side-panel",sidePanel:{type:"csv-import",file:t}}},toggleViewOperationQueue:()=>{"side-panel"===e.ui.open&&"operation-queue"===e.ui.sidePanel.type?e.closeSidePanel():e.ui={open:"side-panel",sidePanel:{type:"operation-queue"}}},toggleConfirmationIsWithCascade:t=>{"confirmation-dialog"===e.ui.open&&("column"===e.ui.confirmationDialog.type||"table"===e.ui.confirmationDialog.type||"view"===e.ui.confirmationDialog.type||"materialized-view"===e.ui.confirmationDialog.type)&&(e.ui.confirmationDialog.isDeleteWithCascade=t??!e.ui.confirmationDialog.isDeleteWithCascade)},operationQueue:{operations:[],status:"idle"},queueOperation:t=>{let n=()=>{0===e.operationQueue.operations.length?e.operationQueue.status="idle":"idle"===e.operationQueue.status&&(e.operationQueue.status="pending")};if(t.type===m.DELETE_ROW){let a=function(e,t){let n=t.payload.rowIdentifiers,a=t.payload.originalRow;if(y(a)){let n=a.__tempId,i=S({type:m.ADD_ROW,tableId:t.tableId,payload:{tempId:n,rowData:a,table:t.payload.table}});return{action:"skip",filteredOperations:e.filter(e=>e.id!==i).filter(e=>!f(e)||e.payload.rowIdentifiers.__tempId!==n)}}return{action:"add",filteredOperations:e.filter(e=>{var a;return a=t.tableId,!(e.tableId===a&&(e.type===m.EDIT_CELL_CONTENT||e.type===m.DELETE_ROW)&&w(e.payload.rowIdentifiers,n))})}}(e.operationQueue.operations,t);if(e.operationQueue.operations=a.filteredOperations,"skip"===a.action)return void n()}if(t.type===m.EDIT_CELL_CONTENT){let a=function(e,t){let n=t.payload.rowIdentifiers;if(e.filter(b).some(e=>e.tableId===t.tableId&&Object.entries(e.payload.rowIdentifiers).every(([e,t])=>n[e]===t)))return{action:"reject",reason:"Cannot edit a cell on a row that is pending deletion. Remove the delete operation first."};let a=n.__tempId;if(a){let n=e.findIndex(e=>e.type===m.ADD_ROW&&e.tableId===t.tableId&&e.payload.tempId===a);if(n>=0){let a=[...e],i=a[n];if(i.type===m.ADD_ROW){let e={...i.payload};e.rowData={...e.rowData,[t.payload.columnName]:t.payload.newValue},a[n]={...i,payload:e,timestamp:Date.now()}}return{action:"merge",updatedOperations:a}}}return{action:"add"}}(e.operationQueue.operations,t);if("reject"===a.action)return void console.warn(a.reason);if("merge"===a.action){e.operationQueue.operations=a.updatedOperations,n();return}}let{operations:a}=function(e,t){let n=S(t),a=e.findIndex(e=>e.id===n),i={...t,id:n,timestamp:Date.now()};if(a>=0){let t=[...e],n=e[a];if(i.type===m.EDIT_CELL_CONTENT&&n.type===m.EDIT_CELL_CONTENT){i.payload.oldValue=n.payload.oldValue;let{oldValue:e,newValue:o}=i.payload;if("number"==typeof e&&Number(e)===Number(o)||"object"==typeof o&&(0,E.default)((0,T.tryParseJson)(e),o)||e===o)return t.splice(a,1),{operations:t}}return t[a]=i,{operations:t}}return{operations:[...e,i]}}(e.operationQueue.operations,t);e.operationQueue.operations=a,n()},clearQueue:()=>{e.operationQueue.operations=[],e.operationQueue.status="idle"},removeOperation:t=>{e.operationQueue.operations=e.operationQueue.operations.filter(e=>e.id!==t),0===e.operationQueue.operations.length&&(e.operationQueue.status="idle")},undoLatestOperation:()=>{e.operationQueue.operations=e.operationQueue.operations.slice(0,-1),0===e.operationQueue.operations.length&&(e.operationQueue.status="idle")},setQueueStatus:t=>{e.operationQueue.status=t},get hasPendingOperations(){return e.operationQueue.operations.length>0},hasPendingCellChange:(t,n,a)=>{let i=S({type:m.EDIT_CELL_CONTENT,tableId:t,payload:{columnName:a,rowIdentifiers:n}});return e.operationQueue.operations.some(e=>e.id===i)},tablesToIgnorePreflightCheck:[],setTableToIgnorePreflightCheck:t=>{let n=new Set(e.tablesToIgnorePreflightCheck);n.add(t),e.tablesToIgnorePreflightCheck=[...n]}});return e},D=(0,_.createContext)(j());e.s(["TABLE_EDITOR_DEFAULT_ROWS_PER_PAGE",0,100,"TableEditorStateContext",0,D,"TableEditorStateContextProvider",0,({children:e})=>{let t=(0,c.useConstant)(j);return(0,n.jsx)(D.Provider,{value:t,children:e})},"useTableEditorStateSnapshot",0,e=>{let t=(0,_.useContext)(D);return(0,u.useSnapshot)(t,e)}],636047)}]);

//# debugId=47be05d4-52ba-a108-1050-f989140814f7