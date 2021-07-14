
exports.up = function(knex) {
  
    return knex.schema
                .createTable('auser', function (table) {
                    table.increments('id');
                    table.string('name').notNullable();
                    table.string('lastname').notNullable();
                    table.string('StudentID').notNullable();
                    table.string('Gender').notNullable();
                    table.string('Kurso').notNullable();
                    table.string('username').notNullable();
                    table.string('password').notNullable();
                    table.string('auth').nullable();
                    table.string('campus').nullable();
                    table.timestamp('reg_date').defaultTo(knex.fn.now());
                    table.timestamp('last_login').defaultTo(knex.fn.now());
                })
                .createTable('my_request', function(table){
                    table.increments('rid');
                    table.string('m_barcode').notNullable();
                    table.string('user_id').notNullable();
                    table.string('username').notNullable();
                    table.string('status').notNullable();                
                    table.timestamp('reg_date').defaultTo(knex.fn.now());
                    table.timestamp('expiration').defaultTo(knex.fn.now());
                })
                .createTable('metadata', function(table){
                    table.increments('id');
                    table.string('title').notNullable();
                    table.string('author').notNullable();
                    table.string('taon').notNullable();
                    table.string('call_number').nullable();
                    table.string('barcode').notNullable();
                    table.text('abstract').nullable();
                    table.string('kurso').notNullable();
                    table.string('filename').nullable();
                    table.string('subjek').notNullable();
                    table.string('curator').nullable();
                    table.string('updateby').nullable();
                    table.string('col').nullable();
                    table.string('com').nullable();
                    table.string('campus').nullable();
                    table.text('raw_data').notNullable();
                    table.string('record_status').nullable();                                  
                    table.timestamp('reg_date').defaultTo(knex.fn.now());                    
                })
                .createTable('mydocuments', function(table){
                    table.increments('id_doc');
                    table.integer('metadata_id').notNullable();
                    table.integer('user_id').notNullable();
                    table.string('a_right').notNullable(); 
                    table.string('campus').nullable();                   
                    table.timestamp('reg_date').defaultTo(knex.fn.now());
                    table.timestamp('expiration').defaultTo(knex.fn.now());
                })
                .createTable('statistics_m', function(table){
                    table.increments('id');
                    table.string('bk_ID').notNullable();
                    table.string('title').Nullable();
                    table.string('author').Nullable();
                    table.string('username').notNullable();
                    table.string('campus').notNullable();
                    table.string('u_name').notNullable();
                    table.string('U_group').nullable();
                    table.string('gender').nullable();
                    table.string('auth').nullable(); 
                    table.string('bulan').nullable();                            
                    table.timestamp('reg_date').defaultTo(knex.fn.now());                  
                })
                .createTable('statistics_login', function(table){
                    table.increments('id');
                    table.string('username').notNullable();
                    table.string('campus').notNullable();
                    table.string('u_name').notNullable();
                    table.string('U_group').nullable();
                    table.string('gender').nullable();
                    table.string('auth').nullable(); 
                    table.string('bulan').nullable();                            
                    table.timestamp('reg_date').defaultTo(knex.fn.now());                  
                })
                .createTable('community_mgr', function(table){
                    table.increments('id');
                    table.string('name').notNullable();
                    table.string('code').notNullable();
                    table.string('campus').nullable();
                    table.string('description').nullable();                    
                    table.timestamp('reg_date').defaultTo(knex.fn.now());  
                })
                .createTable('subcommunity_mgr', function(table){
                    table.increments('id');
                    table.string('parent').notNullable();
                    table.string('sibling').nullable();
                    table.string('name').notNullable();
                    table.string('code').notNullable();
                    table.string('campus').nullable();
                    table.string('description').nullable();                    
                    table.timestamp('reg_date').defaultTo(knex.fn.now());  
                })
                .createTable('collection_mgr', function(table){
                    table.increments('id');
                    table.string('parent').notNullable();
                    table.string('name').notNullable();
                    table.string('code').notNullable();
                    table.string('campus').nullable();
                    table.string('description').nullable();                    
                    table.timestamp('reg_date').defaultTo(knex.fn.now());  
                })
                .createTable('fileStorage', function(table){
                    table.increments('id');
                    table.string('filename').notNullable();
                    table.binary('data').notNullable();                         
                    table.timestamp('reg_date').defaultTo(knex.fn.now());  
                })
                /* mysql sqllite
                .createTable('fileStorage', function(table){
                    table.increments('id');
                    table.string('filename').notNullable();
                    table.longtext('data').notNullable();                         
                    table.timestamp('reg_date').defaultTo(knex.fn.now());  
                })
                */
                
                
};

exports.down = function(knex) {
    return knex.schema
                .dropTable('auser')
                .dropTable('my_request')
                .dropTable('metadata')
                .dropTable('mydocuments')
                .dropTable('statistics_m')
                .dropTable('community_mgr')
                .dropTable('subcommunity_mgr')
                .dropTable('collection_mgr')
                .dropTable('fileStorage')
};
