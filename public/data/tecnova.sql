PRAGMA foreign_keys = ON;
DROP TABLE IF EXISTS avaliacoes_funcionarios;
DROP TABLE IF EXISTS itens_pedido;
DROP TABLE IF EXISTS pedidos;
DROP TABLE IF EXISTS projetos;
DROP TABLE IF EXISTS produtos;
DROP TABLE IF EXISTS clientes;
DROP TABLE IF EXISTS funcionarios;
DROP TABLE IF EXISTS departamentos;

CREATE TABLE departamentos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  area TEXT NOT NULL,
  orcamento REAL NOT NULL
);

CREATE TABLE funcionarios (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  cargo TEXT NOT NULL,
  email TEXT,
  salario REAL NOT NULL,
  ativo BOOLEAN NOT NULL,
  cidade TEXT,
  data_admissao TEXT,
  departamento_id INTEGER,
  gestor_id INTEGER,
  FOREIGN KEY (departamento_id) REFERENCES departamentos(id),
  FOREIGN KEY (gestor_id) REFERENCES funcionarios(id)
);

CREATE TABLE clientes (
  id INTEGER PRIMARY KEY,
  razao_social TEXT NOT NULL,
  segmento TEXT NOT NULL,
  cidade TEXT,
  estado TEXT,
  limite_credito REAL,
  ativo BOOLEAN NOT NULL
);

CREATE TABLE produtos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  categoria TEXT NOT NULL,
  preco REAL NOT NULL,
  custo REAL NOT NULL,
  ativo BOOLEAN NOT NULL
);

CREATE TABLE pedidos (
  id INTEGER PRIMARY KEY,
  cliente_id INTEGER,
  vendedor_id INTEGER,
  data_pedido TEXT NOT NULL,
  status TEXT NOT NULL,
  total REAL NOT NULL,
  canal TEXT,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (vendedor_id) REFERENCES funcionarios(id)
);

CREATE TABLE itens_pedido (
  id INTEGER PRIMARY KEY,
  pedido_id INTEGER NOT NULL,
  produto_id INTEGER NOT NULL,
  quantidade INTEGER NOT NULL,
  preco_unitario REAL NOT NULL,
  desconto REAL DEFAULT 0,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE projetos (
  id INTEGER PRIMARY KEY,
  nome TEXT NOT NULL,
  cliente_id INTEGER,
  gerente_id INTEGER,
  status TEXT NOT NULL,
  data_inicio TEXT,
  data_fim_prevista TEXT,
  orcamento REAL,
  custo_real REAL,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id),
  FOREIGN KEY (gerente_id) REFERENCES funcionarios(id)
);

CREATE TABLE avaliacoes_funcionarios (
  id INTEGER PRIMARY KEY,
  funcionario_id INTEGER NOT NULL,
  periodo TEXT NOT NULL,
  nota REAL,
  comentario TEXT,
  FOREIGN KEY (funcionario_id) REFERENCES funcionarios(id)
);

INSERT INTO departamentos VALUES
(1,'Diretoria','Gestão',900000),(2,'Comercial','Receita',750000),(3,'Tecnologia','Produto',1200000),
(4,'Financeiro','Controle',450000),(5,'Suporte','Operações',380000),(6,'Marketing','Receita',320000);

INSERT INTO funcionarios VALUES
(1,'Ana Martins','Diretora Geral','ana@tecnova.com',28000,1,'São Paulo','2018-01-10',1,NULL),
(2,'Bruno Lima','Gerente Comercial','bruno@tecnova.com',18000,1,'São Paulo','2019-03-15',2,1),
(3,'Carla Souza','Desenvolvedora Sênior','carla@tecnova.com',15500,1,'Campinas','2020-06-01',3,1),
(4,'Diego Alves','Analista Financeiro','diego@tecnova.com',9200,1,'Belo Horizonte','2021-02-20',4,1),
(5,'Eduarda Rocha','Executiva de Contas','eduarda@tecnova.com',8700,1,'Rio de Janeiro','2021-07-12',2,2),
(6,'Felipe Gomes','Analista de Suporte','felipe@tecnova.com',6200,1,'Curitiba','2022-01-05',5,1),
(7,'Camila Nunes','Especialista de Marketing','camila@tecnova.com',9800,1,'São Paulo','2020-11-11',6,1),
(8,'Gustavo Reis','Desenvolvedor Pleno','gustavo@tecnova.com',11000,1,'Recife','2022-08-08',3,3),
(9,'Helena Costa','Gerente de Projetos','helena@tecnova.com',16000,1,'São Paulo','2019-09-09',3,1),
(10,'Igor Pereira','Executivo de Contas','igor@tecnova.com',8100,0,'Goiânia','2020-04-04',2,2),
(11,'João Silva','Analista BI','joao@tecnova.com',10400,1,'Dourados','2023-03-18',3,3),
(12,'Clara Mota','Suporte N2','clara@tecnova.com',7100,1,'Campo Grande','2023-05-22',5,6);

INSERT INTO clientes VALUES
(1,'Agro Norte SA','Agronegócio','Dourados','MS',150000,1),
(2,'Metalúrgica Horizonte','Indústria','Contagem','MG',90000,1),
(3,'Varejo Fácil Ltda','Varejo','São Paulo','SP',70000,1),
(4,'Clínica Vida Plena','Saúde','Rio de Janeiro','RJ',60000,1),
(5,'Construtora Base Forte','Construção','Curitiba','PR',110000,1),
(6,'Escola Futuro Digital','Educação','Campinas','SP',40000,1),
(7,'Transportes Rota Sul','Logística','Porto Alegre','RS',85000,0),
(8,'Energia Limpa Brasil','Energia','Belo Horizonte','MG',130000,1),
(9,'Supermercados União','Varejo','Goiânia','GO',95000,1),
(10,'Cooperativa Campo Alto','Agronegócio','Campo Grande','MS',125000,1),
(11,'TechParts Comércio','Varejo','São Paulo','SP',30000,1),
(12,'Hospital Santa Clara','Saúde','Curitiba','PR',100000,1);

INSERT INTO produtos VALUES
(1,'ERP TechNova Pro','Software',28000,9000,1),
(2,'CRM Cloud','Software',16000,4500,1),
(3,'Licença BI Analytics','Software',12000,3000,1),
(4,'Servidor Edge TX','Hardware',22000,15000,1),
(5,'Notebook Corporativo','Hardware',6500,4200,1),
(6,'Implantação Assistida','Serviço',8500,2500,1),
(7,'Treinamento SQL','Serviço',3500,900,1),
(8,'Suporte Premium Anual','Serviço',14000,4500,1),
(9,'Módulo Fiscal Legacy','Software',5000,2000,0),
(10,'Gateway IoT','Hardware',7800,5100,1);

INSERT INTO pedidos VALUES
(1,1,2,'2026-01-05','entregue',36500,'Direto'),(2,2,5,'2026-01-12','entregue',24500,'Direto'),
(3,3,5,'2026-01-20','cancelado',6500,'Site'),(4,4,2,'2026-02-02','entregue',19500,'Parceiro'),
(5,5,2,'2026-02-10','em_andamento',50500,'Direto'),(6,6,5,'2026-02-18','entregue',12000,'Site'),
(7,8,2,'2026-03-01','entregue',58500,'Direto'),(8,9,5,'2026-03-09','cancelado',3500,'Site'),
(9,10,2,'2026-03-16','entregue',42000,'Parceiro'),(10,1,5,'2026-03-25','em_andamento',18000,'Direto'),
(11,11,5,'2026-04-02','entregue',7800,'Site'),(12,12,2,'2026-04-12','entregue',30000,'Direto'),
(13,3,2,'2026-04-18','entregue',14000,'Site'),(14,5,5,'2026-04-22','entregue',8600,'Parceiro');

INSERT INTO itens_pedido VALUES
(1,1,1,1,28000,0),(2,1,7,1,3500,0),(3,1,6,1,8500,3500),
(4,2,2,1,16000,0),(5,2,6,1,8500,0),
(6,3,5,1,6500,0),(7,4,3,1,12000,0),(8,4,7,1,3500,0),(9,4,8,1,14000,10000),
(10,5,1,1,28000,0),(11,5,4,1,22000,0),(12,5,7,1,3500,3000),
(13,6,3,1,12000,0),(14,7,1,1,28000,0),(15,7,4,1,22000,0),(16,7,8,1,14000,5500),
(17,8,7,1,3500,0),(18,9,2,1,16000,0),(19,9,3,1,12000,0),(20,9,8,1,14000,0),
(21,10,2,1,16000,0),(22,10,7,1,3500,1500),(23,11,10,1,7800,0),
(24,12,3,1,12000,0),(25,12,8,1,14000,0),(26,12,7,1,3500,0),(27,12,6,1,8500,8000),
(28,13,8,1,14000,0),(29,14,6,1,8500,0),(30,14,7,1,3500,3400);

INSERT INTO projetos VALUES
(1,'Implantação ERP Agro Norte',1,9,'em_andamento','2026-01-10','2026-06-30',180000,72000),
(2,'BI Executivo Horizonte',2,11,'concluido','2025-10-01','2026-01-31',95000,87000),
(3,'CRM Varejo Fácil',3,9,'em_risco','2026-02-05','2026-05-30',70000,61000),
(4,'Suporte Premium Energia Limpa',8,6,'em_andamento','2026-03-01','2027-02-28',140000,18000),
(5,'Treinamento SQL Cooperativa',10,11,'planejado','2026-05-01','2026-05-20',25000,0),
(6,'Modernização Hospital Santa Clara',12,9,'em_andamento','2026-03-15','2026-09-15',160000,42000);

INSERT INTO avaliacoes_funcionarios VALUES
(1,2,'2025-Q4',9.1,'Meta comercial superada'),(2,3,'2025-Q4',9.4,'Alta qualidade técnica'),
(3,4,'2025-Q4',8.2,'Boa consistência'),(4,5,'2025-Q4',7.9,'Evolução em carteira'),
(5,6,'2025-Q4',8.5,'Ótimo atendimento'),(6,8,'2025-Q4',8.7,'Boa entrega'),
(7,9,'2025-Q4',9.0,'Projetos críticos'),(8,11,'2025-Q4',8.8,'BI bem estruturado');
