export default function redirectMiddleware(req, res, next) {
    if (req.session.userID) {
        return res.redirect('/'); //giriş yaptıktan sonra login veya signup yönlendirmesi olmamalı...
    }
    next();
}