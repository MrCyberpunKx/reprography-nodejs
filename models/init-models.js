var DataTypes = require("sequelize").DataTypes;
var _acabamento = require("./acabamento");
var _avaliacao_pedido = require("./avaliacao_pedido");
var _centro_custos = require("./centro_custos");
var _curso = require("./curso");
var _departamento = require("./departamento");
var _det_pedido = require("./det_pedido");
var _modo_envio = require("./modo_envio");
var _pedido = require("./pedido");
var _tamanho_pagina = require("./tamanho_pagina");
var _tipo_usuario = require("./tipo_usuario");
var _tipos_capa = require("./tipos_capa");
var _tipos_copia = require("./tipos_copia");
var _usuario = require("./usuario");

function initModels(sequelize) {
  var acabamento = _acabamento(sequelize, DataTypes);
  var avaliacao_pedido = _avaliacao_pedido(sequelize, DataTypes);
  var centro_custos = _centro_custos(sequelize, DataTypes);
  var curso = _curso(sequelize, DataTypes);
  var departamento = _departamento(sequelize, DataTypes);
  var det_pedido = _det_pedido(sequelize, DataTypes);
  var modo_envio = _modo_envio(sequelize, DataTypes);
  var pedido = _pedido(sequelize, DataTypes);
  var tamanho_pagina = _tamanho_pagina(sequelize, DataTypes);
  var tipo_usuario = _tipo_usuario(sequelize, DataTypes);
  var tipos_capa = _tipos_capa(sequelize, DataTypes);
  var tipos_copia = _tipos_copia(sequelize, DataTypes);
  var usuario = _usuario(sequelize, DataTypes);

  det_pedido.belongsTo(acabamento, { as: "id_acabamento_acabamento", foreignKey: "id_acabamento"});
  acabamento.hasMany(det_pedido, { as: "det_pedidos", foreignKey: "id_acabamento"});
  pedido.belongsTo(avaliacao_pedido, { as: "id_avaliacao_pedido_avaliacao_pedido", foreignKey: "id_avaliacao_pedido"});
  avaliacao_pedido.hasMany(pedido, { as: "pedidos", foreignKey: "id_avaliacao_pedido"});
  pedido.belongsTo(centro_custos, { as: "id_centro_custos_centro_custo", foreignKey: "id_centro_custos"});
  centro_custos.hasMany(pedido, { as: "pedidos", foreignKey: "id_centro_custos"});
  pedido.belongsTo(curso, { as: "id_curso_curso", foreignKey: "id_curso"});
  curso.hasMany(pedido, { as: "pedidos", foreignKey: "id_curso"});
  curso.belongsTo(departamento, { as: "id_depto_departamento", foreignKey: "id_depto"});
  departamento.hasMany(curso, { as: "cursos", foreignKey: "id_depto"});
  usuario.belongsTo(departamento, { as: "id_depto_departamento", foreignKey: "id_depto"});
  departamento.hasMany(usuario, { as: "usuarios", foreignKey: "id_depto"});
  pedido.belongsTo(modo_envio, { as: "id_modo_envio_modo_envio", foreignKey: "id_modo_envio"});
  modo_envio.hasMany(pedido, { as: "pedidos", foreignKey: "id_modo_envio"});
  det_pedido.belongsTo(pedido, { as: "id_pedido_pedido", foreignKey: "id_pedido"});
  pedido.hasMany(det_pedido, { as: "det_pedidos", foreignKey: "id_pedido"});
  det_pedido.belongsTo(tamanho_pagina, { as: "id_tamanho_tamanho_pagina", foreignKey: "id_tamanho"});
  tamanho_pagina.hasMany(det_pedido, { as: "det_pedidos", foreignKey: "id_tamanho"});
  usuario.belongsTo(tipo_usuario, { as: "id_tipo_usuario_tipo_usuario", foreignKey: "id_tipo_usuario"});
  tipo_usuario.hasMany(usuario, { as: "usuarios", foreignKey: "id_tipo_usuario"});
  det_pedido.belongsTo(tipos_capa, { as: "id_tipos_capa_tipos_capa", foreignKey: "id_tipos_capa"});
  tipos_capa.hasMany(det_pedido, { as: "det_pedidos", foreignKey: "id_tipos_capa"});
  det_pedido.belongsTo(tipos_copia, { as: "id_tipos_copia_tipos_copium", foreignKey: "id_tipos_copia"});
  tipos_copia.hasMany(det_pedido, { as: "det_pedidos", foreignKey: "id_tipos_copia"});
  pedido.belongsTo(usuario, { as: "nif_usuario", foreignKey: "nif"});
  usuario.hasMany(pedido, { as: "pedidos", foreignKey: "nif"});

  return {
    acabamento,
    avaliacao_pedido,
    centro_custos,
    curso,
    departamento,
    det_pedido,
    modo_envio,
    pedido,
    tamanho_pagina,
    tipo_usuario,
    tipos_capa,
    tipos_copia,
    usuario,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;