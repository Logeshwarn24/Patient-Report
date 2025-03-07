const adminAuth = (req, res, next) => {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Access denied. Admins only.' })
    }
    next()  // If user is an admin, allow them to proceed to the route
  }
  
  module.exports = adminAuth
  