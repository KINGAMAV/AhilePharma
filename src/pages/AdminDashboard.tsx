import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { getUsers, getStats, deleteUser, updateUserRole } from '../services/adminService';
import { Users, Trash2, Edit2, BarChart3 } from 'lucide-react';
import { motion } from 'motion/react';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

interface Stats {
  totalUsers: number;
  patients: number;
  doctors: number;
  pharmacies: number;
  clinics: number;
  deliveries: number;
}

export default function AdminDashboard() {
  const { user, token } = useAuthStore();
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [newRole, setNewRole] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const usersData = await getUsers(token);
        const statsData = await getStats(token);
        setUsers(usersData.users);
        setStats(statsData.stats);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDeleteUser = async (userId: string) => {
    if (!token || !confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return;

    try {
      await deleteUser(token, userId);
      setUsers(users.filter(u => u._id !== userId));
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleUpdateRole = async (userId: string) => {
    if (!token || !newRole) return;

    try {
      await updateUserRole(token, userId, newRole);
      setUsers(users.map(u => (u._id === userId ? { ...u, role: newRole } : u)));
      setEditingUserId(null);
      setNewRole('');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
    }
  };

  if (!user || !['Doctor', 'Pharmacy', 'Clinic', 'Delivery'].includes(user.role)) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-slate-600">Accès refusé. Vous n'avez pas les permissions nécessaires.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-slate-600">Chargement des données...</p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Tableau de Bord Admin</h1>
        <p className="text-slate-600">Gérez les utilisateurs et consultez les statistiques.</p>
      </div>

      {stats && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Utilisateurs</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
              </div>
              <Users className="text-blue-400" size={32} />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Patients</p>
                <p className="text-2xl font-bold text-green-600">{stats.patients}</p>
              </div>
              <BarChart3 className="text-green-400" size={32} />
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Médecins</p>
                <p className="text-2xl font-bold text-purple-600">{stats.doctors}</p>
              </div>
            </div>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Pharmacies</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pharmacies}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold">Liste des Utilisateurs</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-600">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-600">Email</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-600">Rôle</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{u.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{u.email}</td>
                  <td className="px-6 py-4 text-sm">
                    {editingUserId === u._id ? (
                      <div className="flex gap-2">
                        <select
                          value={newRole}
                          onChange={(e) => setNewRole(e.target.value)}
                          className="px-2 py-1 rounded border border-slate-200"
                        >
                          <option value="">Sélectionner un rôle</option>
                          <option value="Patient">Patient</option>
                          <option value="Doctor">Médecin</option>
                          <option value="Pharmacy">Pharmacie</option>
                          <option value="Clinic">Clinique</option>
                          <option value="Delivery">Livreur</option>
                        </select>
                        <button
                          onClick={() => handleUpdateRole(u._id)}
                          className="px-3 py-1 bg-primary text-white rounded text-xs font-bold"
                        >
                          Valider
                        </button>
                      </div>
                    ) : (
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold">
                        {u.role}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingUserId(u._id);
                          setNewRole(u.role);
                        }}
                        className="p-2 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <Edit2 size={16} className="text-blue-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(u._id)}
                        className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
