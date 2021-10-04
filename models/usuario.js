module.exports = function (sequelize, DataTypes) {
  return sequelize.define('usuario', {
    nif: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    telefone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    id_depto: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'departamento',
        key: 'id_depto'
      }
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: "unique_email"
    },
    cfp: {
      type: DataTypes.STRING(7),
      allowNull: false
    },
    imagem: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'usuario',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nif" },
        ]
      },
      {
        name: "unique_email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "id_depto",
        using: "BTREE",
        fields: [
          { name: "id_depto" },
        ]
      },
    ]
  });
};
