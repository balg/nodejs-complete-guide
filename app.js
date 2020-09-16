const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const sequelize = require("./util/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");
const Order = require("./models/order");
const OrderItem = require("./models/order-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

let userId;
app.use((req, res, next) => {
  User.findByPk(userId)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.error(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// User - Product
Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
// User - Cart
User.hasOne(Cart);
Cart.belongsTo(User);
// Cart - Product
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
// Order - User
Order.belongsTo(User);
User.hasMany(Order);
// Order - Producy
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => User.findOne())
  .then((user) => {
    if (!user) {
      return User.create({
        firstName: "Balika",
        lastName: "Jilling",
        email: "balika@test.com",
      });
    }
    return user;
  })
  .then((user) => {
    userId = user.id;
    return user.getCart().then((cart) => {
      if (!cart) {
        return user.createCart();
      }
      return cart;
    });
  })
  .then((cart) => {
    app.listen(3000);
  })
  .catch((err) => console.error(err));
