USE macrofinds;
DROP TABLE  usuarios;
CREATE TABLE usuarios (
	id_usuario INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
	nome_usuario VARCHAR(255) NOT NULL,
	idade_usuario INT NOT NULL,
	peso_usuario FLOAT NOT NULL,
	altura_usuario FLOAT NOT NULL,
	email_usuario VARCHAR(255) NOT NULL,
	sexo_usuario VARCHAR(50) DEFAULT NULL,
	tipo_atividade_fisica ENUM("N", "M", "I"), -- N - nenhuma, M - moderada, I - intensa
	senha_usuario VARCHAR(255) NOT NULL,
	data_criacao_usuario DATETIME DEFAULT CURRENT_TIMESTAMP,
	data_atualizacao_usuario DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE dietas (
	id_dieta INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
	nome_dieta VARCHAR(255) NOT NULL,
	objetivo_dieta VARCHAR(255) NOT NULL,
	data_criacao_dieta DATETIME DEFAULT CURRENT_TIMESTAMP,
	data_atualizacao_dieta DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	fk_id_usuario INT NOT NULL,
	FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario)
);

CREATE TABLE usuarios_dietas (
	id_usuario_dieta INT PRIMARY KEY AUTO_INCREMENT UNIQUE NOT NULL,
	fk_id_dieta INT NOT NULL,
	fk_id_usuario INT NOT NULL,
	FOREIGN KEY (fk_id_dieta) REFERENCES dietas(id_dieta),
	FOREIGN KEY (fk_id_usuario) REFERENCES usuarios(id_usuario)
);