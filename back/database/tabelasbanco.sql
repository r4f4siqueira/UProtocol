/* tipos das variaveis, nomes, e ligacoes (FKs) conforme o diagrama de classes */
CREATE TABLE Conta (
	id serial PRIMARY KEY,
	ativo BOOLEAN NOT NULL,
	login VARCHAR(30),
	senha VARCHAR(30),
);

CREATE TABLE Setor (
	id serial PRIMARY KEY,
	ativo BOOLEAN NOT NULL,
	Nome VARCHAR(30),
	dataC TIMESTAMP,
	userC INT,
	dataM TIMESTAMP,
	userM INT,
	empresa INT,
);

CREATE TABLE Usuario (
	id serial PRIMARY KEY,
	ativo BOOLEAN NOT NULL,
	nome VARCHAR(50) NOT NULL,
	email VARCHAR(50),
	conta INT,
	setor INT,
	cargo VARCHAR(20),
    dataC TIMESTAMP,
	userC INT,
	dataM TIMESTAMP,
	userM INT,
	empresa INT,
	FOREIGN KEY (conta)
      REFERENCES Conta (id),
	FOREIGN KEY (setor)
      REFERENCES Setor (id)
);

CREATE TABLE Empresa (
	id serial PRIMARY KEY,
	ativo BOOLEAN NOT NULL,
	cnpj_cpf VARCHAR(14),
	razaoSocial VARCHAR(50),
	fantasia VARCHAR(50),
	criador int,
    dataC TIMESTAMP,
	userC INT,
	dataM TIMESTAMP,
	userM INT,
	FOREIGN KEY (criador)
      REFERENCES Usuario (id)
);

CREATE TABLE Cliente (
	id serial PRIMARY KEY,
	ativo BOOLEAN NOT NULL,
	cnpj_cpf VARCHAR(14),
	razaoSocial VARCHAR(50),
	fantasia VARCHAR(50),
    dataC TIMESTAMP,
	userC INT,
	dataM TIMESTAMP,
	userM INT,
	empresa INT
);

