# Api DOC


## ❌ Erros:



| Entidade | Codigo | Mensagem | response
| -------- | ------ | -------- | --------
|Empresa | [0](# "ver no codigo") | Userc vazio para cadastrar nova empresa | 400
|Empresa|[1](# "ver no codigo")|Nome ou Fantasia não preenchido para criar empresa| 400
|Empresa|[2](# "ver no codigo")|Parametros invalidos para buscar dados, parametro passado: `id`| 400
|Empresa|[3](# "ver no codigo")|Empresa com ID: `id` Nao encontrada para buscar os dados"| 404
|Empresa|[4](# "ver no codigo")|parametros preenchidos errados para deletar empresa| 400
|Empresa|[5](# "ver no codigo")|Empresa com ID: `id` Nao encontrada para deletar| 404
|Empresa|[6](# "ver no codigo")|Parametro ID inválido para alterar os dados da empresa| 400
|Empresa|[7](# "ver no codigo")|Empresa com ID: `id` Nao encontrada para alterar os dados| 404
|Empresa|[8](# "ver no codigo")|USERM invalido para alterar dados da empresa| 400
|Empresa|[9](# "ver no codigo")|Nome ou Fantasia não preenchido para alterar dados da empresa| 400
|Protocolo|[10](# "ver no codigo")|Userc não preenchido para cadastrar protocolo| 400
|Protocolo|[11](# "ver no codigo")|Atendente não preenchido para cadastrar protocolo| 400
|Protocolo|[12](# "ver no codigo")|Cliente não preenchido para cadastrar protocolo| 400
|Protocolo|[13](# "ver no codigo")|Empresa não preenchida para cadastrar protocolo| 400
|Protocolo|[14](# "ver no codigo")|Parametros invalidos para consultar protocolo, parametro passado: `id`| 400
|Protocolo|[15](# "ver no codigo")|Protocolo com ID: `id` nao encontrado| 404
|Protocolo|[16](# "ver no codigo")|Protocolo já está concluido| 403
|Empresa|[17](# "ver no codigo")|userm não preenchido para DELETAR empresa| 400
|Funcionario|[18](# "ver no codigo")|UID inválida para criar funcionário| 400
|Funcionario|[19](# "ver no codigo")|Nome invalido para criar funcionario| 400
|Funcionario|[20](# "ver no codigo")|Email invalido para criar funcionario| 400
|Funcionario|[21](# "ver no codigo")|Parametro invalido para consultar funcionario| 400
|Funcionario|[21](# "ver no codigo")|Funcionaro com ID: `id` nao encontrado| 404
