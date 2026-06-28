import React, { useState, useEffect } from "react";
import {
  MoreVertical,
  Building2,
  MapPin,
  Briefcase,
  X,
  Trash2,
  AlertTriangle,
  Power,
  PowerOff,
  Bookmark,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  getUserProfilewith,
  updateUserStatusAndDelete,
  saveQuery,
  getSavedQueries,
} from "../api/service2";
import EmployerDetailsModalAllInfo from "./EmployerDetailsModalAllInfo";
// Delete Modal Component
const DeleteUserModal = ({ user, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const fullName = `${user.firstName} ${user.lastName}`;

  const showToastMessage = (message, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      const res = await updateUserStatusAndDelete({
        actionType: "DELETE",
        userId: user.id,
      });

      // Success toast from API message
      toast.success(res.message || "User deleted successfully!");

      setTimeout(() => {
        if (onSuccess) onSuccess();
        onClose();
      }, 1500);
    } catch (error) {
      console.error("Delete error:", error);

      toast.error(error.response?.data?.message || "Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-[60] animate-slide-in text-start">
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg ${
              toastType === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {toastType === "success" ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <AlertTriangle className="w-6 h-6" />
            )}
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-6 rounded-t-2xl relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                disabled={loading}
              >
                <X className="w-6 h-6 text-white" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Delete User</h2>
                  <p className="text-red-100 text-sm mt-1">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                <p className="text-red-800 font-medium mb-2">
                  Are you sure you want to delete this user?
                </p>
                <p className="text-red-700 text-sm">
                  All data associated with this user will be permanently
                  removed.
                </p>
              </div>

              {/* User Details */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200 text-start">
                <div className="flex items-start gap-3">
                  {user.employer?.organizationLogoPreviewUrl ? (
                    <img
                      src={user.employer.organizationLogoPreviewUrl}
                      alt={fullName}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">
                      {fullName.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {fullName}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{user.role}</p>
                    {user.employer?.companyName && (
                      <p className="text-xs text-gray-500 mt-2">
                        Company: {user.employer.companyName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="flex-1 px-6 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-5 h-5" />
                      Delete User
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Card Component
const EmployerCard = ({ employer, onSelect, onMenuClick }) => {
  const fullName = `${employer.firstName} ${employer.lastName}`;
  const isEmployer = employer.role === "EMPLOYER";
  const isEmployee = employer.role === "EMPLOYEE";

  const company = isEmployer ? employer.employer?.companyName : "N/A";
  const industry = isEmployer
    ? employer.employer?.industry
    : isEmployee
      ? employer.employee?.industry
      : "N/A";

  const logoUrl = isEmployer
    ? employer.employer?.organizationLogoPreviewUrl
    : null;

  return (
    <div
      onClick={() => onSelect(employer)}
      className="bg-white rounded-xl border border-blue-100 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer p-4"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={company}
              className="w-12 h-12 rounded-lg object-cover border border-blue-200 flex-shrink-0"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0 shadow-md">
              {fullName.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0 text-left">
            <h3 className="font-semibold text-blue-900 truncate text-base">
              {fullName}
            </h3>
            <p className="text-sm text-blue-600 truncate flex items-center gap-1 mt-1">
              <Building2 size={14} className="flex-shrink-0" />
              <span>{isEmployer ? company : employer.role}</span>
            </p>
          </div>
        </div>

        <button
          onClick={(e) => onMenuClick(employer, e)}
          className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors flex-shrink-0"
        >
          <MoreVertical size={18} className="text-blue-600" />
        </button>
      </div>

      <div className="space-y-2.5">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <MapPin size={14} className="text-blue-500 flex-shrink-0" />
          <span className="truncate">
            {employer.address?.city}, {employer.address?.state}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Briefcase size={14} className="text-blue-500 flex-shrink-0" />
          <span className="truncate">{industry || "N/A"}</span>
        </div>

        <div className="flex items-center justify-start pt-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              employer.is_active
                ? "text-green-700 bg-green-50 border border-green-200"
                : "text-red-700 bg-red-50 border border-red-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                employer.is_active ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {employer.is_active ? "Active" : "Inactive"}
          </span>
        </div>
      </div>
    </div>
  );
};

// Main Component
const EmployerList = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRole, setSelectedRole] = useState("SUPER_ADMIN");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showMenu, setShowMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [savedCandidateIds, setSavedCandidateIds] = useState(new Set());

  const fetchSavedCandidates = async () => {
    try {
      const res = await getSavedQueries({
        type: "CANDIDATE",
        page: 1,
        limit: 1000,
      });

      const ids = new Set((res?.data?.saved || []).map((item) => item.value));

      setSavedCandidateIds(ids);
    } catch (err) {
      console.error("Failed to fetch saved candidates", err);
    }
  };
  const handleSaveCandidate = async (user) => {
    const wasSaved = savedCandidateIds.has(user.id);

    setSavedCandidateIds((prev) => {
      const next = new Set(prev);

      if (wasSaved) {
        next.delete(user.id);
      } else {
        next.add(user.id);
      }

      return next;
    });

    try {
      const res = await saveQuery(user.id, "CANDIDATE");

      toast.success(
        res?.message ||
          (wasSaved ? "Removed from saved" : "Candidate saved successfully"),
      );

      await fetchSavedCandidates();
    } catch (err) {
      fetchSavedCandidates();

      toast.error(err?.response?.data?.message || "Unable to update candidate");
    }
  };

  const usersPerPage = 12;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUserProfilewith(
        currentPage,
        usersPerPage,
        selectedRole,
      );
      const usersData = res?.data?.users || [];

      setUsers(
        usersData.map((user) => ({
          ...user,
          isSaved: savedCandidateIds.has(user.id),
        })),
      );

      setTotalUsers(res?.data?.totalCount || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSavedCandidates();
  }, [currentPage, selectedRole]);

  const handleMenuClick = (user, event) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuPosition({ x: rect.left - 120, y: rect.bottom + 5 });
    setShowMenu(showMenu === user.id ? null : user.id);
    setSelectedUser(user);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user); // <-- Missing line
    setShowMenu(null);
    setShowDetailsModal(true);
  };

  const handleToggleStatus = async (user) => {
    setActionLoading(true);
    setShowMenu(null);

    try {
      const actionType = user.is_active ? "DISABLE" : "ENABLE";

      const res = await updateUserStatusAndDelete({
        actionType,
        userId: user.id,
      });

      // Toast success from API response
      toast.success(res.message);

      // Refresh users list
      await fetchUsers();
    } catch (error) {
      console.error("Toggle status error:", error);

      toast.error(
        error.response?.data?.message || "Failed to update user status",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteClick = (user) => {
    setShowMenu(null);
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleDeleteSuccess = () => {
    fetchUsers();
  };

  const totalPages = Math.ceil(totalUsers / usersPerPage);

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 p-4 sm:p-4">
      <div className="mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 py-5 px-6 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 text-left">
              Users <span className="text-blue-600">({totalUsers})</span>
            </h2>

            <select
              value={selectedRole}
              onChange={(e) => {
                setSelectedRole(e.target.value);
                setCurrentPage(1);
              }}
              className="border border-blue-300 rounded-lg px-4 py-2.5 bg-white text-blue-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full sm:w-auto"
            >
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="EMPLOYER">Employer</option>
              <option value="EMPLOYEE">Employee</option>
            </select>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center h-[61vh] py-20 text-blue-600">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4" />
              <p className="text-lg font-medium">Loading users...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && users.length === 0 && (
            <div className="flex flex-col h-[61vh] justify-center items-center py-20 text-gray-500">
              <Building2 size={64} className="text-blue-300 mb-4" />
              <p className="text-lg font-medium text-blue-900">
                No users found
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Try selecting a different role
              </p>
            </div>
          )}

          {/* Cards Grid */}
          {!loading && users.length > 0 && (
            <div className="p-4 sm:p-6 h-[61vh] overflow-y-scroll overflow-x-hidden custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {users.map((user) => (
                  <EmployerCard
                    key={user.id}
                    employer={{
                      ...user,
                      isSaved: savedCandidateIds.has(user.id),
                    }}
                    onSelect={handleSelectUser}
                    onMenuClick={handleMenuClick}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          {totalUsers > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 sm:p-5 border-t border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <p className="text-sm text-blue-700 font-medium">
                Showing {(currentPage - 1) * usersPerPage + 1} to{" "}
                {Math.min(currentPage * usersPerPage, totalUsers)} of{" "}
                {totalUsers} users
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-blue-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100 transition-colors font-medium text-blue-900 text-sm"
                >
                  Previous
                </button>

                <span className="px-4 py-2 bg-blue-100 text-blue-900 rounded-lg font-semibold text-sm">
                  {currentPage} / {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-4 py-2 border border-blue-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-100 transition-colors font-medium text-blue-900 text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Context Menu */}
      {showMenu && selectedUser && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setShowMenu(null)}
          />
          <div
            className="fixed z-40 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[180px]"
            style={{
              left: `${menuPosition.x}px`,
              top: `${menuPosition.y}px`,
            }}
          >
            <button
              onClick={() => handleToggleStatus(selectedUser)}
              disabled={actionLoading}
              className="w-full px-4 py-2.5 text-left hover:bg-blue-50 transition-colors flex items-center gap-3 text-gray-700 disabled:opacity-50"
            >
              {selectedUser.is_active ? (
                <>
                  <PowerOff size={18} className="text-red-500" />
                  <span>Disable User</span>
                </>
              ) : (
                <>
                  <Power size={18} className="text-green-500" />
                  <span>Enable User</span>
                </>
              )}
            </button>

            <button
              className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition ${
                selectedUser?.isSaved
                  ? "bg-indigo-50 text-indigo-700 font-medium"
                  : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
              }`}
              onClick={() => {
                handleSaveCandidate(selectedUser);
                setShowMenu(null);
              }}
            >
              <Bookmark
                size={18}
                fill={selectedUser?.isSaved ? "currentColor" : "none"}
              />

              {selectedUser?.isSaved ? "Saved" : "Save Candidate"}
            </button>

            <div className="border-t border-gray-200 my-1" />

            <button
              onClick={() => handleDeleteClick(selectedUser)}
              disabled={actionLoading}
              className="w-full px-4 py-2.5 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600 disabled:opacity-50"
            >
              <Trash2 size={18} />
              <span>Delete User</span>
            </button>
          </div>
        </>
      )}
      {/* Delete Modal */}
      {showDeleteModal && selectedUser && (
        <DeleteUserModal
          user={selectedUser}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          onSuccess={handleDeleteSuccess}
        />
      )}
      {/* Action Loading Overlay */}
      {actionLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-xl">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-700 font-medium">Updating user status...</p>
          </div>
        </div>
      )}
      {/* Details Modal */}{" "}
      {showDetailsModal && selectedUser && (
        <EmployerDetailsModalAllInfo
          employer={selectedUser}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default EmployerList;
