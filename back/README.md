# 📃Api DOC

- [Start Server](#-start-server)
- [Permissões](#-permissões)
    - [Tabela de Permissões](#-tabela-de-permissões)
- [Funções](#-funções)
    - [Empresa](#-empresa)
    - [Funcionários](#%EF%B8%8F-funcion%C3%A1rio)
    - [Setor](#-setor)
    - [Funcionário Empresa](#%EF%B8%8F-funcion%C3%A1rio-empresa)
    - [Clientes](#-cliente)
    - [Contato](#-contato)
    - [Prioridade](#-prioridade)
- [Erros](#-erros)
    - [Server Response](#-server-response)
    - [Mensagens de Erros](#-mensagens-de-erros)
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

### 👷‍♂️ Funcionário Empresa
| Nome | Parametros | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarFuncionarioEmpresa|`({request,response})`|A função obriga a passar as seguitnes informações `uid: String, email: String, empresa: int, cargo: char`;|G|Convida um funcionário para a empresa|
|listarFuncionarioEmpresas|`({request,response})`|A função retorna uma lista de funcionários vinculados a empresa, a função requer que seja passado as seguintes informações na request `uid: String, empresa: int`;|F|Retorna uma lista de funcionários vinculados a empresa;
|~~dadosFuncionarioEmpresa~~|`({params})`|Requer a `ID` do `funcionarioEmpresa` através da parametro URL|F|Retorna os dados do registro `funcionarioEmpresa`
|verificaVinculo|`(uid,empresa)`|Verifica se o funcionario está vinculado a empresa (uso interno)|-|Retorna `true` ou `false`;
|alterarFuncionarioEmpresa|`({request,response})`|Altera Cargo e Setor do funcionário vinculado a empresa, requer que seja informado `uid: String, empresa: integer, funcionario: integer, setor: integer, cargo: char, id: integer`;|G|Altera as informaçoes do funcionário vinculado a empresa;
|deletarFuncionarioEmpresa|`({params,request,response})`|Requer que informe a `id` do vinculo do funcionário empresa por parametro url e as seguintes informações na request `uid: string, empresa: integer`;|G|Retorna os dados do funcionario desvinculado;
|aceitarConvite|`({params,request,response})`|Rota para aceitar os convites, requer que informe o `id` da relação funcionário empresa por parametro URL mais as seguintes informações na request `uid: string, resposta: boolean`;|F|Caso aceite retorna os dados do registro funcionarioEmpresa, caso recusar retorna uma mensagem `{msg:"convite recusado"}`;
|listarConvite|`({request})`|Lista todos os convites pendentes de resposta, requer que passe a `uid` para consultar os convites;|F|Retorna os dados do registro fruncionario empresa;

### 👨🏻‍🦰 Cliente
| Nome | Parametros | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarCliente|`({request,response})`|Função obriga a passar as seguintes informações na request `ativo: boolean, razaosocial: string, fantasia: string,CNPJ_CPF: string, empresa: integer, uid: string`;|F|Retorna os dados do cliente cadastrado|
|listarClientes|`({request,response})`|Para listar os clientes relacionado a empresa nescessita informar `uid: string, empresa: integer`|F|Retorna uma lista de clientes vinculados aquela empresa;
|alterarCliente|`({params,request,response})`|Requer que passe a `id` por pareametro URL e os seguintes dados na request `ativo: boolean, razaosocial: string, fantasia: string, CNPJ_CPF: string, uid: string, empresa: int`|F|Retornas o cliente com os dados atualizados;
|~~dadosCliente~~|`({params})`|Retorna os dados de um cliente em específico, requer que passe a `id` do cliente por parametro URL|F|Retorna os dados de um cliente em específico;
|deletarCliente|`({params,request,response})`|Cliente só será deletado caso não tenha protocolo vunculado, passar a `id` do cliente por parametro URL junto aos seguintes dados na request `uid: string, empresa: integer`;|F|Retorna os dados do cliente excluido;

### 📞 Contato
| Nome | Parametros | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarContato|`({request,response})`|Cria contato vinculado a um cliente, nescessita que passe os seguintes dados na request `ativo: boolean, cliente: integer, telefone: string, email: string, pessoa: string, uid: string, empresa: integer`;|F|Retorna os dados do contato cadastrado;
|listarContatos|`({request,response})`|Lista os contatos vinculados de determinado cliente, na request informar `uid: string, empresa: integer, cliente: integer`;|F|Retorna uma lista com os contatos vinculados ao cliente;
|~~dadosContato~~|`({params})`|Retorna os dados de um contato especifico, requer que passe a `id` por parametro URL;|F|Retorna os dados do contato;
|alterarContato|`({params,request,response})`|Usada para alterar os dados de um contato vinculado a um cliente, requer que informe o `id` por parametro URL e os seguintes dados junto na request `ativo: boolean, cliente: integer, telefone: string, email: string, pessoa: string, uid: string`;|F|Retoda os dados do contato alterado;
|deletarContato|`({params,request,response})`|Para excluir o contato é nescessário informa a `id` por parametro URL e os seguintes dados junto na request `uid: string, empresa: integer`;|F|Retorna os dados do contato excluido

### 🔝 Prioridade
| Nome | Parametros | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarPrioridade|`({request,response})`|Cria uma prioridade para ordenar os protocolos, requer que seja informado os seguintes dados na request `ativo: boolean, nome: string, ordemimportancia: integer, uid: string, empresa: integer`|G|Retorna os dados da prioridade cadastrada;
|listarPrioridades|`({request,response})`|Retorna uma lista de prioridades da empresa, requer que informe na requeste os dados de `uid: string, empresa: integer`;|F|Retorna lista de prioridades vinculada a empresa;
|~~dadosPrioridade~~|`({params})`|Informa a `id` da prioridade por parametro de URL e retorna os dados da prioridade;|F|Reotorna os dados da prioridade informada;




## ⛔ Erros:

### 🟡 Server Response 

| Codigo | Descrção |
| ------ | -------- |
| 400 | Parametros enviados invalidos|
| 403 | Sem permissao para realizar a ação|
| 404 | Nao encontrado retorno para requisicao|
| 500 | Erro interno no servidor|


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
|Setor|[45](# "ver no codigo")|Setor Geral não pode ser excluido ou alterado| 403
|Funcionario Empresa|[46](# "ver no codigo")|Funcionário não encontrado no sistema para Convidar funcionário| 404
|Funcionario Empresa|[47](# "ver no codigo")|Funcionário sem permissão para convidar funcionario| 403
|Funcionario Empresa|[48](# "ver no codigo")|Funcionário Não Encontrado| 404
|Funcionario Empresa|[49](# "ver no codigo")|Funcionário já vinculado a empresa ou pendente de resposta| 403
|Funcionario Empresa|[50](# "ver no codigo")|Funcionário Não vinculado a empresa para listar os funcionários| 404
|Funcionario Empresa|[51](# "ver no codigo")|Funcionário Não vinculado a empresa para alterar funcionários| 404
|Funcionario Empresa|[52](# "ver no codigo")|Funcionário sem permissão para alterar funcionários| 403
|Funcionario Empresa|[53](# "ver no codigo")|Funcionário não vinculado a empresa para remover funcionario| 404
|Funcionario Empresa|[54](# "ver no codigo")|Funcionário sem permissão para remover funcionario| 403
|Funcionario Empresa|[55](# "ver no codigo")|O vinculo de Funcionário e empresa não foi encontrado para ser removido| 404
|Funcionario Empresa|[56](# "ver no codigo")|Não pode remover o criador da empresa| 403
|Funcionario Empresa|[57](# "ver no codigo")|Não encontrado convite para esse usuário| 404
|Funcionario Empresa|[58](# "ver no codigo")|Não pode alterar cargo do Criador da empresa| 403
|Funcionario Empresa|[59](# "ver no codigo")|Não pode alterar setor ou cargo de Funcionári com convite pendente| 403
|Cliente|[60](# "ver no codigo")|Funcionário não vinculado a empresa para cadastrar cliente| 404
|Cliente|[61](# "ver no codigo")|Razão social é obrigatório ser informada| 400
|Cliente|[62](# "ver no codigo")|Funcionario não vinculado a empresa para listar clientes| 404
|Contato|[63](# "ver no codigo")|Funcionario não vinculado a empresa para listar contatos| 404
|Funcionario Empresa|[64](# "ver no codigo")|Já vinculado a outra empresa como criador| 403
|Contato|[65](# "ver no codigo")|Convite já aceito ou inexistente| 404
|Cliente|[66](# "ver no codigo")|Cliente não encontrado para ser alterado| 404
|Cliente|[67](# "ver no codigo")|`uid` não Informada| 400
|Cliente|[68](# "ver no codigo")|Funcionário não vinculado a empresa para alterar dados do Cliente| 404
|Cliente|[69](# "ver no codigo")|**Razão Social** ou **Nome** não informados| 400
|Cliente|[70](# "ver no codigo")|Algo deu errado em salvar cliente| 500
|Cliente|[71](# "ver no codigo")|Cliente não encontrado para ser deletado| 404
|Cliente|[72](# "ver no codigo")|Não informada UID para excluir cliente| 400
|Cliente|[73](# "ver no codigo")|Usuario não cadastrado ou não vinculado a empresa para excluir cliente| 400
|Cliente|[74](# "ver no codigo")|Não foi possivel excluir, cliente tem um ou mais protocolos vinculados a ele| 400
|Contato|[75](# "ver no codigo")|Funcionario não vinculado a empresa para criar contato| 404
|Contato|[76](# "ver no codigo")|Cliente não encontrado para criar contato| 404
|Contato|[77](# "ver no codigo")|Cliente não encontrado para listar contatos| 404
|Contato|[78](# "ver no codigo")|Contato com a `id` informada não encontrado| 404
|Contato|[79](# "ver no codigo")|Funcionario não vinculado a empresa para alterar contato| 404
|Contato|[80](# "ver no codigo")|Algo deu errado em salvar contato| 500
|Contato|[81](# "ver no codigo")|Contato não pertence ao cliente selecionado/informado| 400
|Contato|[82](# "ver no codigo")|Contato não encontrado para ser excluido| 404
|Contato|[83](# "ver no codigo")|uid não informada para excluir contato| 400
|Contato|[84](# "ver no codigo")|Usuario não cadastrado ou não vinculado a empresa para excluir contato| 404
|Prioridade|[85](# "ver no codigo")|Funcionario não vinculado a empresa para criar Prioridade| 404
|Prioridade|[86](# "ver no codigo")|Funcionário sem permissão para Criar prioridade| 403
|Prioridade|[87](# "ver no codigo")|Nome ou Ordem de Importância inválidos| 400
|Prioridade|[88](# "ver no codigo")|funcionario não vinculado a empresa para listar prioridades| 404
|Prioridade|[89](# "ver no codigo")|Prioridade não encontrada para ser alterada| 404
|Prioridade|[90](# "ver no codigo")|Funcionario não vinculado a empresa para alterar Prioridade| 404
|Prioridade|[91](# "ver no codigo")|Funcionário sem permissão para alterar prioridade| 403
