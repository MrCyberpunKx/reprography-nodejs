const { authJwt } = require("../middlewares");
const { upload } = require("../middlewares/");
const { verifySignUp } = require("../middlewares/");
const controller = require("../controllers/usuario-controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "accessToken, Origin, Content-Type, Accept"
    );
    next();
  });

  //Usuário Comum 

  //POST

  //Logando e recebendo token jwt
  app.post("/logar", controller.logar);

  //GET

  //Exibe as informações basicas do usuário logado (autenticado pelo jwt)
  app.get("/meuUsuario", [authJwt.validateToken], controller.informacoesBasicas);


  //PUT

  //Altera as informações do usuário logado (autenticado pelo jwt) => Faz upload e atualiza imagem do usuário
  app.put('/meuUsuario', upload.single('imagem'), [authJwt.validateToken], controller.alterarUsuario);

  //Rota para atualizar a senha
  app.put("/mudarSenha", [authJwt.validateToken], controller.mudarSenha);


  //Delete

  //Deleta as informações do usuário logado (autenticado pelo jwt)
  app.delete('/meuUsuario', [authJwt.validateToken], controller.excluirUsuario);


  //Gerentes --- (ADMIN)

  //POST

  //Registrando Usuário
  app.post(
    "/registrar", upload.single('imagem'),
    [
      authJwt.validateToken,
      authJwt.isAdmin,
      verifySignUp.checkDuplicateNifOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.adicionarUsuario
  );


  //GET

  //Exibe todos os usuários da tabela usuario
  app.get("/usuarios", [authJwt.validateToken, authJwt.isAdmin], controller.buscarTodos);

  //Exibe o usuarío por nome na tabela usuario (exemplo: host:porta/usuariox)
  app.get("/usuario/:user", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNome);

  //Exibe o usuarío por nif na tabela usuario (exemplo: host:porta/33321)
  app.get("/usuario/nif/:nif", [authJwt.validateToken, authJwt.isAdmin], controller.buscarPorNif);


  //PUT

  //Rota para alterar um usuario da tabela usuario por NIF //Rota para administrador (pode colocar o nif que quiser)
  app.put('/usuario/:nif', [authJwt.validateToken, authJwt.isAdmin], upload.single('imagem'), controller.alterarPorNif);


  //Delete

  //Rota para deletar um usuario da tabela usuario por NIF //Rota para administrador (pode colocar o nif que quiser)
  app.delete('/usuario/:nif', [authJwt.validateToken, authJwt.isAdmin], controller.excluirPorNif);

};