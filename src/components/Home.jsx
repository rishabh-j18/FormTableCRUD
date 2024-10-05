import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUsers } from "../controls/Userservices";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
  Drawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
} from "@mui/material";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const userData = await fetchUsers();
      setUsers(userData);
      setFilteredUsers(userData); 
      setLoading(false);
    };
    getUser();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  const handleCreate = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleUpdate = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
    setOpenDrawer(false);
  };

  const handleDelete = async (id) => {
    await deleteUsers(id);
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    setOpenDeleteDialog(false);
  };

  const handleOpenEditDrawer = (user) => {
    setEditingUser(user);
    setOpenDrawer(true);
  };

  const handleOpenDeleteDialog = (user) => {
    setUserToDelete(user);
    setOpenDeleteDialog(true);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <CreateUser onCreate={handleCreate} />

      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        {editingUser && (
          <EditUser
            user={editingUser}
            onUpdate={handleUpdate}
            onClose={() => setOpenDrawer(false)}
          />
        )}
      </Drawer>

      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {userToDelete?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={() => handleDelete(userToDelete.id)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Table>
          <TableHead >
            <TableRow>
              <TableCell sx={{fontWeight:'bold'}}>Name</TableCell>
              <TableCell sx={{fontWeight:'bold'}}>Email</TableCell>
              <TableCell sx={{fontWeight:'bold'}}>Phone</TableCell>
              <TableCell sx={{fontWeight:'bold'}}>Username</TableCell>
              <TableCell sx={{fontWeight:'bold'}}>Street</TableCell>
              <TableCell sx={{fontWeight:'bold'}}>City</TableCell>
              <TableCell sx={{fontWeight:'bold'}}>Company Name</TableCell>
              <TableCell sx={{fontWeight:'bold'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow
                key={user.id}
                sx={{ backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff" }}
              >
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.address.street}</TableCell>
                <TableCell>{user.address.city}</TableCell>
                <TableCell>{user.companyname}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleOpenEditDrawer(user)}
                    variant="outlined"
                    sx={{ marginRight: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(user)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default Home;
