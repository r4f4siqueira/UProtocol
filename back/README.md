# 📃Api DOC
## ▶ Start Server
Depois de executar as etapas na página inicial do repositório, execute os comandos abaixo para iniciar o servidor:

`adonis serve --dev`

or

`adonis serve`

##  🚫 Permissões:
Cada funcionário vinculado a empresa terá uma permissão separada em 3 níveis diferentes conforme mostra a tabela abaixo:
### 📄 Tabela de Permissões
| Codigo | Descricao |
| ------ | --------- |
| **A** | **Administrador:** quem criou a empresa, essa permissão também pode ser concedida a um funcionário através de um administrador, com essa permissão o funcionario pode gerenciar a empresa por inteiro;
| **G** | **Gerente:** tem poder de remover funcionarios da empresa, mas não pode alterar os dados da empresa
| **F** | **Funcionario:** Apenas meche com os protocolos
## 📚 Funções:

### 🏭 Empresa:
| Nome | Parametros | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarEmpresa|`({request,response})`|A função obriga a passar as seguintes informações através da request: `ativo: boolean, CNPJ_CPF: String, razaosocial: String,fantasia: String, uid:String`;|A|Retorna a empresa cadastrada;
|listarEmpresas|`({request,response})`|Necessita que seja passado o `uid` do usuario que está solicitando as informações da emrpresa;|F|Retorna uma lista de empresas que o usuário está vinculado;
|~~dadosEmpresa~~|`({params,request,response})`|Passa o codigo da empresa por parametro da URL;|F|Retorna os dados da empresa;
|alterarEmpresa| `({params,request,response})`|Precisa do `id` da empresa passada por parametro URL e as seguintes informações na request: `ativo: boolean, CNPJ_CPF: String, razaosocial: String, fantasia: String, criador: int, uid: String`;|A|Atualiza os dados da empresa;
|~~deletarEmpresa~~|`({params,request,response})`|Informar a id da empresa por parametro URL e a `uid` para verificar permissões;|A|Retorna os dados da empresa excluida

### 👷‍♂️ Funcionário:
| Nome | Parametros | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarFuncionario|`({request,response})`|Por padrão o usuário é criado assim que é realizado o primeiro login no sistema, a função obriga a passar na request os seguintes dados: `ativo: boolean, nome: String, email: String, uid: String, avatarURL: String`;|-|Retorna os dados do usuário criado
|dadosFuncionario|`({request,response})`|Necessita passar a `uid` através da request;|F|Retorna os dados do Funcionário;
|~~dadosFuncionario~~|`({params,response})`|Informa a `id` por parametro da URL;|F|Retorna os dados do Funcionário;

### 🦾 Setor:
| Nome | Parametros | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarSetor|`({request,response})`|A função obriga a passar as seguintes informações: `ativo: int, nome: String, empresa: int, uid: String`;|G|Retorna os dados do setor criado;
|~~dadosSetor~~|`({params})`|Informa o ID do setor por parametro URL|F|Retorna os dados do setor informado;
|listarSetores|`({request,params,response})`|Informa o `id` da empresa por parametro URL e a `uid` para verificar vinculo do funcionario com a empresa;|F|Retorna uma lista com todos os setores da empresa;
|criarSetorEmpresa|`({request,response})`|Função utilizada apenas para vincular o criador da empresa a um setor padrão;|A|Vincula o criador a um setor;
|alterarSetor|`({params,request,response})`|Altera os dados do setor e necessita que seja informado a `id` do setor por parametro da URL e passar as seguintes informações: `ativo: int, nome: String, uid: String, empresa: int`;|G|Retorna o setor com os dados alterados;
|deletarSetor|`({params,respose})`|Apaga o setor informado através do parametro da URL, precisa da `uid` para verificar se o funcionario tem permissão para excluir o setor;|G|Retorna os dados do setor deletado;



## ⛔ Erros:

### 🟡 Server Response 

| Codigo | Descrção |
| ------ | -------- |
| 400 | Parametros enviados invalidos|
| 403 | Sem permissao para realizar a ação|
| 404 | Nao encontrado retorno para requisicao|


### 📩 Mensagens de erros
| Entidade | Codigo | Mensagem | response
| -------- | ------ | -------- | --------
|Empresa|[0](# "ver no codigo")|UID vazio para cadastrar nova empresa | 400
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
|Empresa|[17](# "ver no codigo")|UID não preenchido para DELETAR empresa| 400
|Funcionario|[18](# "ver no codigo")|UID inválida para criar funcionário| 400
|Funcionario|[19](# "ver no codigo")|Nome invalido para criar funcionario| 400
|Funcionario|[20](# "ver no codigo")|Email invalido para criar funcionario| 400
|Funcionario|[21](# "ver no codigo")|Parametro invalido para consultar funcionario| 400
|Funcionario|[21](# "ver no codigo")|Funcionaro com ID: `id` nao encontrado| 404
|Empresa|[22](# "ver no codigo")|Funcionario nao encontrado no banco de dados| 404
|Empresa|[23](# "ver no codigo")|Funcionario nao encontrado no banco de dados para alterar os dados da empresa| 404
|Empresa|[24](# "ver no codigo")|Funcionario sem permissao para alterar os dados da empresa| 403
|Empresa|[25](# "ver no codigo")|Funcionario nao esta vinculado a esta empresa| 404
|Empresa|[26](# "ver no codigo")|Funcionario nao encontrado no banco de dados para DELETAR os dados da empresa| 404
|Empresa|[27](# "ver no codigo")|Funcionario nao vinculado a empresa para DELETAR| 404
|Empresa|[28](# "ver no codigo")|Funcionario sem permissao para DELETAR empresa| 403
|Empresa|[29](# "ver no codigo")|Parametros invalidos para buscar empresas vinculadas ao funcionario| 400
|Setor|[30](# "ver no codigo")|Não informado uid para buscar setores vinculadas a empresa| 400
|Setor|[31](# "ver no codigo")|Setor não encontrado| 404
|Setor|[32](# "ver no codigo")|Funcionario não vinculado a empresa para alterar setor| 404
|Funcionario|[33](# "ver no codigo")|`uid` do usuário não informada| 400
|Funcionario|[34](# "ver no codigo")|Nenhum funcionário encontrado| 404
|Empresa|[35](# "ver no codigo")|Funcionário não vinculado a empresa| 404
|Setor|[36](# "ver no codigo")|Funcionário não encontrado no sistema| 404
|Setor|[37](# "ver no codigo")|Funcionário não encontrado no sistema para criar setor| 404
|Setor|[38](# "ver no codigo")|Funcionário sem permissão ou não vinculado a empresa para criar setor| 403
|Setor|[39](# "ver no codigo")|Funcionario não vinculado a empresa| 404
|Setor|[40](# "ver no codigo")|Funcionario sem permissão para alterar setor| 403
|Setor|[41](# "ver no codigo")|Parametros informados inválidos ou não informados| 400
|Setor|[42](# "ver no codigo")|Funcionario não vinculado a empresa para excluir setor| 400
|Setor|[43](# "ver no codigo")|Setor `setor.nome` não pode ser alterado'| 400
|Setor|[44](# "ver no codigo")|Setor não encontrado'| 404
|Setor|[45](# "ver no codigo")|Setor Geral não pode ser excluido ou alterado'| 401