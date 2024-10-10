SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `cooperativa_db`;

CREATE SCHEMA IF NOT EXISTS `cooperativa_db` DEFAULT CHARACTER SET utf8;
USE `cooperativa_db`;

CREATE TABLE IF NOT EXISTS `cooperativa_db`.`estados` (
  `idEstado` INT NOT NULL AUTO_INCREMENT,
  `estado` VARCHAR(12) NOT NULL,
  `descripcion_estado` MEDIUMTEXT NULL,
  PRIMARY KEY (`idEstado`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `cooperativa_db`.`tipos_empleados` (
  `idTipo_empleado` INT NOT NULL AUTO_INCREMENT,
  `tipo_empleado` VARCHAR(30) NOT NULL,
  `descripcion_tipo_empleado` MEDIUMTEXT NULL,
  PRIMARY KEY (`idTipo_empleado`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `cooperativa_db`.`creditos` (
  `idCredito` INT NOT NULL AUTO_INCREMENT,
  `nombre_credito` VARCHAR(50) NULL,
  `descripcion_credito` MEDIUMTEXT NULL,
  PRIMARY KEY (`idCredito`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `cooperativa_db`.`empleados` (
  `idEmpleado` INT NOT NULL AUTO_INCREMENT,
  `nombre_empleado` VARCHAR(50) NOT NULL,
  `apellido_empleado` VARCHAR(50) NOT NULL,
  `direccion_empleado` MEDIUMTEXT NOT NULL,
  `username` VARCHAR(30) NOT NULL,
  `password` VARCHAR(50) NOT NULL,
  `correo_empleado` VARCHAR(50) NOT NULL,
  `telefono_empleado` VARCHAR(8) NOT NULL,
  `tipo_empleado_id` INT NULL,
  `estado_id` INT NULL,
  PRIMARY KEY (`idEmpleado`),
  CONSTRAINT `fk_estado_id_empleados`
    FOREIGN KEY (`estado_id`)
    REFERENCES `cooperativa_db`.`estados` (`idEstado`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tipo_empleado_id`
    FOREIGN KEY (`tipo_empleado_id`)
    REFERENCES `cooperativa_db`.`tipos_empleados` (`idTipo_empleado`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE UNIQUE INDEX `username_UNIQUE` ON `cooperativa_db`.`empleados` (`username` ASC) VISIBLE;
CREATE UNIQUE INDEX `correo_empleado_UNIQUE` ON `cooperativa_db`.`empleados` (`correo_empleado` ASC) VISIBLE;
CREATE INDEX `tipo_empleado_id_idx` ON `cooperativa_db`.`empleados` (`tipo_empleado_id` ASC) VISIBLE;
CREATE INDEX `estado_id_idx` ON `cooperativa_db`.`empleados` (`estado_id` ASC) VISIBLE;

CREATE TABLE IF NOT EXISTS `cooperativa_db`.`clientes` (
  `idCliente` INT NOT NULL AUTO_INCREMENT,
  `nombre_cliente` VARCHAR(50) NOT NULL,
  `apellido_cliente` VARCHAR(50) NOT NULL,
  `direccion_cliente` MEDIUMTEXT NOT NULL,
  `dui` VARCHAR(10) NOT NULL,
  `salario` DECIMAL(8,2) NOT NULL,
  `correo_cliente` VARCHAR(50) NOT NULL,
  `telefono_cliente` VARCHAR(8) NOT NULL,
  `documento1` MEDIUMTEXT NULL,
  `documento2` MEDIUMTEXT NULL,
  `documento3` MEDIUMTEXT NULL,
  `estado_id` INT NOT NULL,
  PRIMARY KEY (`idCliente`),
  CONSTRAINT `fk_estado_id_clientes`
    FOREIGN KEY (`estado_id`)
    REFERENCES `cooperativa_db`.`estados` (`idEstado`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE UNIQUE INDEX `dui_UNIQUE` ON `cooperativa_db`.`clientes` (`dui` ASC) VISIBLE;
CREATE UNIQUE INDEX `correo_cliente_UNIQUE` ON `cooperativa_db`.`clientes` (`correo_cliente` ASC) VISIBLE;
CREATE INDEX `estado_id_idx` ON `cooperativa_db`.`clientes` (`estado_id` ASC) VISIBLE;

CREATE TABLE IF NOT EXISTS `cooperativa_db`.`solicitudes` (
  `idSolicitud` INT NOT NULL AUTO_INCREMENT,
  `cliente_id` INT NOT NULL,
  `empleado_id` INT NULL,
  `estado_id` INT NOT NULL,
  `credito_id` INT NOT NULL,
  PRIMARY KEY (`idSolicitud`),
  CONSTRAINT `fk_cliente_id`
    FOREIGN KEY (`cliente_id`)
    REFERENCES `cooperativa_db`.`clientes` (`idCliente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_empleado_id`
    FOREIGN KEY (`empleado_id`)
    REFERENCES `cooperativa_db`.`empleados` (`idEmpleado`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_estado_id_solicitudes`
    FOREIGN KEY (`estado_id`)
    REFERENCES `cooperativa_db`.`estados` (`idEstado`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_credito_id`
    FOREIGN KEY (`credito_id`)
    REFERENCES `cooperativa_db`.`creditos` (`idCredito`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE INDEX `cliente_id_idx` ON `cooperativa_db`.`solicitudes` (`cliente_id` ASC) VISIBLE;
CREATE INDEX `empleado_id_idx` ON `cooperativa_db`.`solicitudes` (`empleado_id` ASC) VISIBLE;
CREATE INDEX `estado_id_idx` ON `cooperativa_db`.`solicitudes` (`estado_id` ASC) VISIBLE;
CREATE INDEX `credito_id_idx` ON `cooperativa_db`.`solicitudes` (`credito_id` ASC) VISIBLE;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
