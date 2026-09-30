import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";

export const register = async (req,res)=>{

    try{

        const {username,password}=req.body;

        const hashedPassword=await bcrypt.hash(password,10);

        const user=await User.create({

            username,
            password:hashedPassword

        });

        res.json(user);

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

}

export const login=async(req,res)=>{

    try{

        const {username,password}=req.body;

        const user=await User.findOne({username});

        if(!user){

            return res.status(401).json({

                message:"Invalid Username"

            });

        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){

            return res.status(401).json({

                message:"Invalid Password"

            });

        }

        req.session.user={

            id:user._id,
            username:user.username,
            role: user.role

        };

        res.json({

            success:true,
            message:"Login Successful"

        });

    }

    catch(error){

        res.status(500).json({

            message:error.message

        });

    }

}

export const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Logout failed"
            });
        }

        res.clearCookie("connect.sid");

        return res.json({
            success: true,
            message: "Logout successful"
        });
    });
};


export const checkAuth = async (req, res) => {
  try {
    // Get user from SESSION
    const user = req.session?.user;

    if (!user) {
      return res.status(401).json({
        authenticated: false,
        message: "Not authenticated"
      });
    }

    let permissions = {};

    // Superadmin always has full access
    if (user.role?.toLowerCase() === "superadmin") {
      permissions = {
        consignor: {
          view: true,
          add: true,
          edit: true,
          delete: true,
          import: true,
          export: true
        },

        consignment: {
          view: true,
          add: true,
          edit: true,
          delete: true,
          import: true,
          export: true
        },

        history: {
          view: true,
          add: true,
          edit: true,
          delete: true,
          import: true,
          export: true
        },

        roles: {
          view: true,
          add: true,
          edit: true,
          delete: true,
          import: true,
          export: true
        }
      };
    } else {
      const roleData = await Role.findOne({
        name: user.role
      });

      permissions = roleData?.permissions || {};
    }

    return res.status(200).json({
      authenticated: true,

      user: {
        _id: user._id,
        username: user.username,
        role: user.role,
        permissions
      }
    });

  } catch (error) {
    console.error("Auth check error:", error);

    return res.status(500).json({
      authenticated: false,
      message: "Server error"
    });
  }
};