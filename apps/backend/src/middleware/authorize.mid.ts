// middlewares/withRole.js
export const withRole = (...allowedRoles: [string]) => {
  return async (req:any, res:any, next:any) => {
    try {
      const { user } = req.auth;

      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      const role = user.publicMetadata?.role;

      if (!role || !allowedRoles.includes(role)) {
        return res.status(403).json({ error: 'Access denied: insufficient privileges' });
      }

      next();
    } catch (err) {
      console.error('RBAC middleware error:', err);
      return res.status(500).json({ error: 'Internal RBAC middleware error' });
    }
  };
};
