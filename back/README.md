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
    - [Protocolo](#-protocolo)
    - [Repasses](#-repasse)
    - [Observações](#-observações)
    - [Anexos](#-anexos)
- [Erros](#-erros)
    - [Server Response](#-server-response)
    - [Mensagens de Erros](#-mensagens-de-erros)
## ▶ Start Server
Depois de executar as etapas na [página inicial](https://github.com/r4f4siqueira/UProtocol#uprotocol) do repositório, execute os comandos abaixo para iniciar o servidor:

`adonis serve --dev` para o ambiente de desenvolvedor, onde a cada atualização de algum arquivo ele atualiza o servidor;

or

`adonis serve` desta forma ele só atualiza o servidor ao reiniciar;

##  🚫 Permissões:
Cada funcionário vinculado a empresa terá uma permissão separada em 3 níveis diferentes conforme mostra a tabela abaixo:
### 📄 Tabela de Permissões
| Codigo | Descricao |
| ------ | --------- |
| **A** | **Administrador:** quem criou a empresa, essa permissão também pode ser concedida a um funcionário através de um administrador, com essa permissão o funcionario pode gerenciar a empresa por inteiro;
| **G** | **Gerente:** tem poder de remover funcionarios da empresa, mas não pode alterar os dados da empresa
| **F** | **Funcionario:** Apenas meche com os protocolos

Estas permissões são importantes para realizar o controle referente a que o usuário pode fazer dentro do sistema, elas são preenchidas no momento de realizar um convite para um funcionário e pode ser alterada no cadastros de funcionários.

Sobre a permissão definida como **A** ela não pode ser alterada, pois é a permissão definida para o *criador* da empresa assim que a empresa é criada;
## 📚 Funções:

### 🏭 Empresa:
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarEmpresa|`/empresa`|A função obriga a passar as seguintes informações através da request: `ativo: boolean, CNPJ_CPF: String, razaosocial: String,fantasia: String, uid:String`;|A|Retorna a empresa cadastrada;
|listarEmpresas|`/empresa`|Necessita que seja passado o `uid` do usuario que está solicitando as informações da emrpresa;|F|Retorna uma lista de empresas que o usuário está vinculado;
|~~dadosEmpresa~~|`/empresa/:id`|Passa o codigo da empresa por parametro da URL;|F|Retorna os dados da empresa;
|alterarEmpresa| `/empresa/:id`|Precisa do `id` da empresa passada por parametro URL e as seguintes informações na request: `ativo: boolean, CNPJ_CPF: String, razaosocial: String, fantasia: String, criador: int, uid: String`;|A|Atualiza os dados da empresa;
|~~deletarEmpresa~~|`/empresa/:id`|Informar a id da empresa por parametro URL e a `uid` para verificar permissões;|A|Retorna os dados da empresa excluida

### 👷‍♂️ Funcionário:
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarFuncionario|`/funcionario`|Por padrão o usuário é criado assim que é realizado o primeiro login no sistema, a função obriga a passar na request os seguintes dados: `ativo: boolean, nome: String, email: String, uid: String, avatarURL: String`;|-|Retorna os dados do usuário criado
|alterarFuncionario|`/funcionario/:id`|Precisa do `id` da empresa passada por parametro URL e as seguintes informações na request: `ativo: boolean, nome: string, email: string, avatarURL: string`|-|Retorna os dados atualizados;
|dadosFuncionario|`/funcionario`|Necessita passar a `uid` através da request;|F|Retorna os dados do Funcionário;
|~~dadosFuncionario~~|`/funcionario/:id`|Informa a `id` por parametro da URL;|F|Retorna os dados do Funcionário;

### 🦾 Setor:
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarSetor|`/setor`|A função obriga a passar as seguintes informações: `ativo: int, nome: String, empresa: int, uid: String`;|G|Retorna os dados do setor criado;
|~~dadosSetor~~|`-`|Informa o ID do setor por parametro URL|F|Retorna os dados do setor informado;
|listarSetores|`/setor/:empresa`|Informa o `id` da empresa por parametro URL e a `uid` para verificar vinculo do funcionario com a empresa;|F|Retorna uma lista com todos os setores da empresa;
|criarSetorEmpresa|`-`|Função utilizada apenas para vincular o criador da empresa a um setor padrão;|A|Vincula o criador a um setor;
|alterarSetor|`/setor/:id`|Altera os dados do setor e necessita que seja informado a `id` do setor por parametro da URL e passar as seguintes informações: `ativo: int, nome: String, uid: String, empresa: int`;|G|Retorna o setor com os dados alterados;
|deletarSetor|`/setor/:id`|Apaga o setor informado através do parametro da URL, precisa da `uid` para verificar se o funcionario tem permissão para excluir o setor;|G|Retorna os dados do setor deletado;

### 👷‍♂️ Funcionário Empresa
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarFuncionarioEmpresa|`/funcionarioempresa`|A função obriga a passar as seguitnes informações `uid: String, email: String, empresa: int, cargo: char`;|G|Convida um funcionário para a empresa|
|listarFuncionarioEmpresas|`/funcionarioempresa`|A função retorna uma lista de funcionários vinculados a empresa, a função requer que seja passado as seguintes informações na request `uid: String, empresa: int`;|F|Retorna uma lista de funcionários vinculados a empresa;
|~~dadosFuncionarioEmpresa~~|`/funcionarioempresa/:id`|Requer a `ID` do `funcionarioEmpresa` através da parametro URL|F|Retorna os dados do registro `funcionarioEmpresa`
|verificaVinculo|`-`|Verifica se o funcionario está vinculado a empresa (uso interno)|-|Retorna `true` ou `false`;
|alterarFuncionarioEmpresa|`/funcionarioempresa`|Altera Cargo e Setor do funcionário vinculado a empresa, requer que seja informado `uid: String, empresa: integer, funcionario: integer, setor: integer, cargo: char, id: integer`;|G|Altera as informaçoes do funcionário vinculado a empresa;
|deletarFuncionarioEmpresa|`/funcionarioempresa/:id`|Requer que informe a `id` do vinculo do funcionário empresa por parametro url e as seguintes informações na request `uid: string, empresa: integer`;|G|Retorna os dados do funcionario desvinculado;
|aceitarConvite|`/convite/:id`|Rota para aceitar os convites, requer que informe o `id` da relação funcionário empresa por parametro URL mais as seguintes informações na request `uid: string, resposta: boolean`;|F|Caso aceite retorna os dados do registro funcionarioEmpresa, caso recusar retorna uma mensagem `{msg:"convite recusado"}`;
|listarConvite|`/convite`|Lista todos os convites pendentes de resposta, requer que passe a `uid` para consultar os convites;|F|Retorna os dados do registro fruncionario empresa;

### 👨🏻‍🦰 Cliente
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarCliente|`/cliente`|Função obriga a passar as seguintes informações na request `ativo: boolean, razaosocial: string, fantasia: string,CNPJ_CPF: string, empresa: integer, uid: string`;|F|Retorna os dados do cliente cadastrado|
|listarClientes|`/cliente`|Para listar os clientes relacionado a empresa nescessita informar `uid: string, empresa: integer`|F|Retorna uma lista de clientes vinculados aquela empresa;
|alterarCliente|`/cliente/:id`|Requer que passe a `id` por pareametro URL e os seguintes dados na request `ativo: boolean, razaosocial: string, fantasia: string, CNPJ_CPF: string, uid: string, empresa: int`|F|Retornas o cliente com os dados atualizados;
|~~dadosCliente~~|`/cliente/:id`|Retorna os dados de um cliente em específico, requer que passe a `id` do cliente por parametro URL|F|Retorna os dados de um cliente em específico;
|deletarCliente|`/cliente/:id`|Cliente só será deletado caso não tenha protocolo vunculado, passar a `id` do cliente por parametro URL junto aos seguintes dados na request `uid: string, empresa: integer`;|F|Retorna os dados do cliente excluido;

### 📞 Contato
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarContato|`/contato/:id`|Cria contato vinculado a um cliente, nescessita que passe os seguintes dados na request `ativo: boolean, cliente: integer, telefone: string, email: string, pessoa: string, uid: string, empresa: integer`;|F|Retorna os dados do contato cadastrado;
|listarContatos|`/contato`|Lista os contatos vinculados de determinado cliente, na request informar `uid: string, empresa: integer, cliente: integer`;|F|Retorna uma lista com os contatos vinculados ao cliente;
|~~dadosContato~~|`/contato/:id`|Retorna os dados de um contato especifico, requer que passe a `id` por parametro URL;|F|Retorna os dados do contato;
|alterarContato|`/contato/:id`|Usada para alterar os dados de um contato vinculado a um cliente, requer que informe o `id` por parametro URL e os seguintes dados junto na request `ativo: boolean, cliente: integer, telefone: string, email: string, pessoa: string, uid: string`;|F|Retoda os dados do contato alterado;
|deletarContato|`/contato/:id`|Para excluir o contato é nescessário informa a `id` por parametro URL e os seguintes dados junto na request `uid: string, empresa: integer`;|F|Retorna os dados do contato excluido

### 🔝 Prioridade
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarPrioridade|`/prioridade`|Cria uma prioridade para ordenar os protocolos, requer que seja informado os seguintes dados na request `ativo: boolean, nome: string, ordemimportancia: integer, uid: string, empresa: integer`|G|Retorna os dados da prioridade cadastrada;
|listarPrioridades|`/prioridade`|Retorna uma lista de prioridades da empresa, requer que informe na requeste os dados de `uid: string, empresa: integer`;|F|Retorna lista de prioridades vinculada a empresa;
|~~dadosPrioridade~~|`/prioridade/:id`|Informa a `id` da prioridade por parametro de URL e retorna os dados da prioridade;|F|Reotorna os dados da prioridade informada;
|alterarPrioridade|`/prioridade/:id`|Requer que informe a `id` da prioridade por parametro URL e as seguintes infromações na request `ativo: boolean, nome: string, ordemimportancia: integer, uid: string, empresa: integer` para realizar a alteração;|G|Retorna os dados atualizados da prioridade;
|deletarPrioridade|`/prioridade/:id`|Deleta as informações da prioridade informada, informar a `id` da prioridade por paremetro URL e os seguintes dados na request `uid: string, empresa: integer`;|G|Retorna os dados da prioridade deletada;

### 📋 Protocolo
Protocolo atualmente tem duas situações `C: concluído` e `A: aberto`, protocolos com situação concluído não pode sofrer nenhum tipo de alteração ou observação;

Também não é possível excluir protocolos abertos, caso o protocolo tenha sido aberto errado pode fazer as alterações necessárias ou observar que o protocolo foi aberto errado, desta forma evitando problemas de usabilidade;

| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarProtocolo|`/protocolo`|Requer que seja passada as seguintes informações na request `cliente: integer, prioridade: integer, setor: integer, pessoaatendida: string, motivo: string, previsao: timestemp, uid: string, empresa: integer` para a criação do protocolo|F|Retorna os dados do protocolo criado;
|listarProtocolos|`/protocolo`|Retorna uma lista de protocolos, ordenados de acordo com a prioridade e a previsão, requer que seja informado os seguintes dados na request `uid: string, empresa: integer`|F|Retorna uma lista de protocolos respeitando a seguinte ordem: prioridade, previsão e identificador(id) de protocolos;
|dadosProtocolo|`/protocolo/:id`|Retorna os dados e as observações referente ao `id` do protocolo informado por parametro URL, requer que seja informado na request `uid: string, empresa: integer` para validar a requisição|F|Retorna os dados do protocolo junto com as respectivas observações;
|alterarProtocolo|`/protocolo/:id`|Requer que informe por parametro URL a `id` do protocolo e os seguintes dados na request `cliente: integer, prioridade: integer, setor: integer, pessoaatendida: string, motivo: string, previsao: timestemp, situacao: char, uid: string, empresa: integer` para atualizar os dados do protocolo;|F|Retorna o protocolo com os dados atualizados
|concluirProtocolo|`/protocolo/concluir/:id`|use a rota `protocolo/concluir/:id` para concluir o protocolo e informe `uid: string, empresa: integer` na request;|F|Retorna os dados do protocolo encerrado;

### 🔄 Repasse
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarRepasse|`/repasse`|Registra um repasse de protocolo para outro atendente, altera o atendente do protocolo e observa no o repasse, requer que seja informado na request `protocolo: integer, funcionariodestino: integer, setor: integer, uid: string, empresa: integer`;|F|Retorna os dados do registro do repasse;
|listarRepasses|`/repasse`|Retorna uma lista com os repasses realizados de determinado protocolo, informar `uid: string, empresa: integer, protocolo: integer` na request;|F|Retorna uma lista de repasses ordenada de forma crescente;

### 📝 Observações
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarObservacao|`/observacao`|Registra uma observação no protocolo informado na request, dados que devem ser informado na request `protocolo: integer, observacao: string, uid: string, empresa: integer`;|F|Retorna os dados cadastrados da observação;
|~~listarObservacoes~~|`-`|lista todas as observações, desativada no momento|F|Retorna uma lista de observações;
|~~dadosObservacao~~|`-`|Retorna os dados de uma observação especifica informada por parametro URL|F|Retorna os dados da observação;
|~~alterarObservacao~~|`-`|Altera os dados da observação informada por parametro|F|Retorna os dados atualizados;
|~~deletarObservacao~~|`-`|Deleta observação|F|Retorna uma mensagem de sucesso;

### 📎 Anexos
| Nome | Endpoint | Descrição | Permissão | Sucesso |
| ---- | ---------- | --------- | --------- | ------- |
|criarAnexo|`/anexo`|Registra um anexo ao protocolo com as informações passadas por request `protocolo: integer, descricao: string, anexo: string, uid: string, empresa: integer`;|F|Retorna as informações cadastradas;
|listarAnexos|`/anexo`|Informar na request `protocolo: integer, uid: string, empresa: integer` para retornar a lista de anexos;|F|Retorna uma lista de anoexos ordenados por `id`;
|~~dadosAnexo~~|`/anexo/:id`|Informar por paremetro URL a `id` do anexo;|F|Retorna os dados do anexo informado no paremetro URL;
|alterarAnexo|`anexo/:id`|Iformar por parametro URL a `id` do anexo e novos dados por resquest `descricao: string, anexo: string, uid: string, empresa: integer`;|F|Retorna os dados alterados do anexo;
|deletarAnexo|`anexo/:id`|Deleta o anexo de acordo com a `id` informada por parametro URL, informar na request `uid: string`;|F|Retorna os dados do anexo deletado

## ⛔ Erros:

### 🟡 Server Response 

| Codigo | Descrção |
| ------ | -------- |
| 400 | Parametros enviados invalidos|
| 403 | Sem permissao para realizar a ação|
| 404 | Nao encontrado retorno para requisicao|
| 500 | Erro interno no servidor|

Pode acontecer da API retornar um erro com algum código que não esteja listado, isso depende da forma que está sendo inicializado a API, onde ela está hospedada entre outras possibilidades.

A lista acima refere a alguns erros que foram tratados pela api e que podem retornar o código da *response*, o *código do erro* que foi tratado e uma *menságem* personalizada;


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
|Protocolo|[10](# "ver no codigo")|Usuario não encontrado ou não vinculado a empresa para cadastrar protocolo| 404
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
|Prioridade|[92](# "ver no codigo")|Prioridade não encontrada para ser deletada| 404
|Prioridade|[93](# "ver no codigo")|Funcionario não vinculado a empresa para deletar Prioridade| 404
|Prioridade|[94](# "ver no codigo")|Funcionário sem permissão para deletar prioridade| 403
|Protocolo|[95](# "ver no codigo")|Cliente não encontrado| 404
|Protocolo|[96](# "ver no codigo")|Funcionario não vinculado a empresa para listar protocolos| 404
|Protocolo|[97](# "ver no codigo")|funcionario não vinculado a empresa para ver os dados do protocolo| 404
|Protocolo|[98](# "ver no codigo")|Protocolo não encontrado para ser alterado| 404
|Protocolo|[99](# "ver no codigo")|Funcionario não vinculado a empresa para alterar Protocolo| 404
|Repasse|[100](# "ver no codigo")|Usuario não encontrado ou não vinculado a empresa para repassar protocolo| 404
|Repasse|[101](# "ver no codigo")|Funcionário de destino não encontrado ou não vinculado a empresa para repassar protocolo| 404
|Protocolo|[102](# "ver no codigo")|Funcionario não vinculado a empresa para Concluir Protocolo| 404
|Protocolo|[103](# "ver no codigo")|Protocolo já concluido| 403
|Repasse|[104](# "ver no codigo")|Usuário não encontrado ou não vinculado a empresa para listar repasses| 404
|Observação|[105](# "ver no codigo")|Usuário não encontrado ou não vinculado a empresa para observar protocolo| 404
|Observação|[106](# "ver no codigo")|Protocolo não encontrado para ser observado| 404
|Observação|[107](# "ver no codigo")|Protocolo já concluido| 403
|Anexo|[108](# "ver no codigo")|Funcionário não vinculado a empresa para criar um anexo| 404
|Anexo|[109](# "ver no codigo")|Protocolo não encontrado para vincular um Anexo| 404
|Anexo|[110](# "ver no codigo")|Usuário não encontrado ou não vinculado a empresa para listar anexos| 404
|Anexo|[111](# "ver no codigo")|Anexo não encontrado para ser alterado| 404
|Anexo|[112](# "ver no codigo")|Usuário não encontrado ou não vinculado a empresa para alterar anexo| 404
|Anexo|[113](# "ver no codigo")|Anexo não encontrado para ser deletado| 404
|Anexo|[114](# "ver no codigo")|Usuário não encontrado ou não vinculado a empresa para deletar anexo| 404

Como informado anteriormente, a API pode retornar algum erro que não estaja listado, pois este erro não foi tratado ou não aconteceu durante os testes, também levar em consideração as regras de onde a API foi hospedada e a forma que ela foi inicializada;