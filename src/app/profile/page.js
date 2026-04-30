"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { User, Mail, Calendar, Settings, LogOut, Loader2, ArrowLeft, Edit3, Save, X, Camera } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editImage, setEditImage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    } else if (session?.user) {
      setEditName(session.user.name || "");
      setEditImage(session.user.image || "");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/login";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async () => {
    if (!editName.trim()) return;
    setIsUpdating(true);
    
    try {
      await authClient.updateUser({
        name: editName,
        image: editImage,
      });
      setIsEditing(false);
      // Force reload to get updated session data across the app
      window.location.reload();
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (isPending || !session) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#fcfcfc]">
        <Loader2 className="w-12 h-12 animate-spin text-[#253237]" />
      </div>
    );
  }

  const { user } = session;
  const joinDate = new Date(user.createdAt || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[#253237] transition-colors font-bold text-sm uppercase tracking-widest group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        {/* Profile Header Card */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          {/* Edit Profile Toggle Button */}
          <button 
            onClick={() => {
              if (isEditing) {
                setEditName(user.name || "");
                setEditImage(user.image || "");
              }
              setIsEditing(!isEditing);
            }}
            className="absolute top-6 right-6 p-3 bg-gray-50 rounded-full text-gray-500 hover:bg-[#253237] hover:text-white transition-colors"
            title={isEditing ? "Cancel Editing" : "Edit Profile"}
          >
            {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
          </button>

          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#fcfcfc] shadow-lg relative">
              <img 
                src={isEditing ? (editImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(editName || 'User')}&background=random&size=200`) : (user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'User')}&background=random&size=200`)} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Camera className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
            {!isEditing && (
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-[#FFCC4D] rounded-full border-4 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-[#253237] rounded-full animate-pulse"></div>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>
          
          <div className="flex-1 text-center md:text-left space-y-4">
            <div>
              {isEditing ? (
                <div className="space-y-3 max-w-sm mx-auto md:mx-0">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full text-2xl font-black text-[#253237] capitalize px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#253237] focus:outline-none transition-colors"
                    placeholder="Your Name"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateProfile}
                      disabled={isUpdating || !editName.trim()}
                      className="flex-1 py-2 bg-[#253237] text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {isUpdating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl font-black text-[#253237] capitalize mb-2">{user.name}</h1>
                  <p className="text-gray-500 font-medium flex items-center justify-center md:justify-start gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                </>
              )}
            </div>
            
            {!isEditing && (
              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                <div className="px-4 py-2 bg-gray-50 rounded-xl flex items-center gap-2 border border-gray-100">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Joined {joinDate}</span>
                </div>
                <div className="px-4 py-2 bg-green-50 rounded-xl flex items-center gap-2 border border-green-100">
                  <User className="w-4 h-4 text-green-500" />
                  <span className="text-xs font-bold text-green-600 uppercase tracking-wider">Verified User</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Account Settings */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#253237]">Account Overview</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Your basic details</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-bold text-gray-700 border border-gray-100">
                  {user.name}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl text-sm font-bold text-gray-700 border border-gray-100">
                  {user.email}
                  <span className="ml-2 text-[10px] text-green-600 uppercase tracking-widest font-black bg-green-100 px-2 py-1 rounded-md">Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Activity/Logout */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-4 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center">
                <LogOut className="w-6 h-6 text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#253237]">Session</h3>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Manage access</p>
              </div>
            </div>
            
            <div className="mt-auto space-y-4">
              <p className="text-sm text-gray-500 font-medium">
                You are currently signed in securely. If you are using a public computer, make sure to log out before leaving.
              </p>
              <button 
                onClick={handleLogout}
                className="w-full py-4 bg-red-50 text-red-600 font-black uppercase tracking-widest rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 border border-red-100"
              >
                <LogOut className="w-5 h-5" />
                Sign Out Securely
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
