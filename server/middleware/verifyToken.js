const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    if(renewToken(req,res)){
        next()
    }
    // return res.json({ valid: false, message: "access token expired" });
  } else {
    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) return res.json({ valid: false, message: "token expired" });
      req.email = decoded.email;
      next();
    });
  }
};

const renewToken = (req, res) => {
  let exist = false;
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.json({ valid: false, message: "Refresh token expired,login again" });
  } else {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, decoded) => {
      if (err) return res.json({ valid: false, message: "invalid token " });
      const accessToken = jwt.sign(
        { email: user.email, _id: user._id },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1m" }
      );
      res.cookie("accessToken", accessToken, {
        maxAge: 60000,
        httpOnly: true,
      });
      exist = true;
    });
  }
  return exist
};

module.exports = verifyToken;
