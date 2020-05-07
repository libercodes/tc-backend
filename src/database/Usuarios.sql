CREATE TABLE Usuarios (
    id_usuario int AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL,
    apellido VARCHAR(30) NOT NULL,
    email VARCHAR(50) NOT NULL,
    nombreDeUsuario VARCHAR(30) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    estado VARCHAR(20) NOT NULL,
    id_grupo int,
    FOREIGN KEY(id_grupo) REFERENCES Grupos(id_grupo)

)

CREATE TABLE Grupos (
    id_grupo int AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(30) NOT NULL   
)


CREATE TABLE Permisos (
    id_permiso int AUTO_INCREMENT PRIMARY KEY,
    accion VARCHAR(30) NOT NULL,
    id_grupo int NOT NULL,
    FOREIGN KEY(id_grupo) REFERENCES Grupos(id_grupo)
)

CREATE TABLE Movimientos (
    id_movimiento int AUTO_INCREMENT PRIMARY KEY,
    Fecha DATETIME NOT NULL,
    id_usuario int NOT NULL,
    id_accion int NOT NULL,
    FOREIGN KEY(id_usuario) REFERENCES Usuarios(id_usuario),
    FOREIGN KEY(id_accion) REFERENCES Acciones(id_accion)
)

CREATE TABLE Sesiones (
    id_sesion int AUTO_INCREMENT PRIMARY KEY,
    id_usuario int NOT NULL,
    FechaDeInicio DATETIME NOT NULL,
    FechaDeFinalizacion DATETIME,
    FOREIGN KEY(id_usuario) REFERENCES Usuarios(id_usuario)
)