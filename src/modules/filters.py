# ----------------------------------------------------------------------------------------------------------
# category
# ----------------------------------------------------------------------------------------------------------
category_data = ['Data', 'Dados', 'Business Intelligence', 'BI', 'Informações Gerenciais', 'Informacoes Gerenciais', 'Intelligence', 'Inteligência', 'DataViz', 'Data Viz' , 'Visualization', 'Analytics', 'CRM']
category_finance = ['Financeiro', 'Administrativo', 'Contas a Pagar', 'Conciliação']
category_marketing = ['Marketing', 'Marketing']
category_pharmacy = ['Farmacêutica']
category_healthtech = ['Biomédico', 'Clínica']
category_ux = ['Research', 'UX', 'Design Thinking', 'Usabilidade', 'Jornada', 'Jornadas']

dict_category = {
   "Dados" : category_data
   ,"Finanças" : category_finance
   ,"Marketing" : category_marketing
   ,"Farmácia" : category_pharmacy
   ,"Saúde" : category_healthtech
   ,"UX" : category_ux
}

# ----------------------------------------------------------------------------------------------------------
# level
# based = https://www.catho.com.br/salario/action/artigos/Conceituacao_de_Niveis_Hierarquicos.php
# ----------------------------------------------------------------------------------------------------------
level_00_banco_de_talentos    = ['Banco de Talentos', 'Vaga Banco', 'Trabalhe Conosco', 'Talentos']
level_01_aprendiz             = ['Aprendiz', 'Jovem Aprendiz']
level_02_estag                = ['Estag', 'Estágio', 'Estagiário', 'Pessoa Estagiária']
level_03_auxiliar_ajudante    = ['Auxiliar', 'Ajudante', 'Escriturário']
level_04_assistente           = ['Assistant', 'Assistente']
level_05_tecnico              = ['Técnico']
level_06_trainee              = ['Trainee']
level_07_jr                   = [' I','JR', 'Junior']
level_08_pl                   = [' II', 'PL', 'Pleno', 'Mid-level', 'Mid Level']
level_09_sr                   = [' III', 'SR', 'Senior']
level_10_consultor            = ['Consultant', 'Consultor', 'Consultora']
level_11_specialist           = ['Specialist', 'Especialista']
level_12_lead                 = ['Lead', 'Lider', 'Leader']
level_13_supervisor           = ['Supervisor']
level_14_coordinator          = ['Coordinator', 'Coordenador', 'Coordenadora']
level_15_manager              = ['Manager', 'Gerente']
level_16_sr_manager           = ['SR Manager', 'Senior Manager', 'Gerente Senior', 'Gerente Departamental']
level_17_superintendente      = ['Superintendente']
level_18_diretor              = ['Diretor']

dict_level = {
   "00 - Banco de Talentos"         :level_00_banco_de_talentos 
   ,"01 - Aprendiz"                 :level_01_aprendiz          
   ,"02 - Estágiario"               :level_02_estag             
   ,"03 - Auxiliar/Ajudante"        :level_03_auxiliar_ajudante 
   ,"04 - Assistente"               :level_04_assistente        
   ,"05 - Técnico"                  :level_05_tecnico           
   ,"06 - Trainee"                  :level_06_trainee           
   ,"07 - Júnior"                   :level_07_jr                
   ,"08 - Pleno"                    :level_08_pl                
   ,"09 - Sênior"                   :level_09_sr                
   ,"10 - Consultor"                :level_10_consultor         
   ,"11 - Especialista"             :level_11_specialist        
   ,"12 - Líder"                    :level_12_lead              
   ,"13 - Supervisor"               :level_13_supervisor        
   ,"14 - Coordenador"              :level_14_coordinator       
   ,"15 - Gerente"                  :level_15_manager           
   ,"16 - Gerente Sênior"           :level_16_sr_manager        
   ,"17 - Superintendente"          :level_17_superintendente   
   ,"18 - Diretor"                  :level_18_diretor           
}


# ----------------------------------------------------------------------------------------------------------
# remote?
# ----------------------------------------------------------------------------------------------------------
contract_remote = ['Remote', 'Remoto', 'Remota', 'Homeoffice', 'Home-office', 'Homeoffice']

dict_contract = {
   1:contract_remote
}