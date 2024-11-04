import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { AiOutlinePlus } from "react-icons/ai"; // Import icon for "Add Title"
import { FiLogOut } from "react-icons/fi"; // Import icon for "Logout"
import Modal from "./Modal";
import { createTitle, getTitles } from "@/utils/titles/titlesApi";
import SharedInput from "../shared/SharedInput";
import MetaMaskIntegration from "../metaMask/MetaMaskIntegration";

const Dashboard = () => {
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [errors, setErrors] = useState({});
  const [walletAddress, setWalletAddress] = useState(null);

  const handleWalletConnected = (address) => {
    setWalletAddress(address);
  };
  const token = localStorage.getItem("token")?.replace("Bearer ", "");

  useEffect(() => {
    const fetchTitles = async () => {
      setLoading(true);
      try {
        const storedTitles = JSON.parse(localStorage.getItem("titles"));
        if (storedTitles) {
          setTitles(storedTitles);
        } else {
          const data = await getTitles(token);
          setTitles(data);
          localStorage.setItem("titles", JSON.stringify(data));
        }
      } catch (err) {
        console.error("Error fetching titles:", err);
        toast.error("Error fetching titles.");
      } finally {
        setLoading(false);
      }
    };

    fetchTitles();
  }, [token]);

  const handleAddTitleClick = () => {
    if (!walletAddress) {
      toast.error("Please connect your MetaMask wallet to add titles.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleAddTitle = async (e) => {
    e.preventDefault();
    if (!walletAddress) {
      toast.error("Please connect your MetaMask wallet to add titles.");
      return;
    }

    setLoading(true);
    try {
      const createdTitle = await createTitle(token, newTitle);
      const updatedTitles = [...titles, createdTitle];
      setTitles(updatedTitles);
      localStorage.setItem("titles", JSON.stringify(updatedTitles));
      toast.success("Title added successfully!");
      setNewTitle("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding title:", err);
      toast.error("Error adding title. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTitle = (uuid) => {
    if (!walletAddress) {
      toast.error("Please connect your MetaMask wallet to delete titles.");
      return;
    }
    const updatedTitles = titles.filter((title) => title.uuid !== uuid);

    setTitles(updatedTitles);
    localStorage.setItem("titles", JSON.stringify(updatedTitles));
    toast.success("Title deleted successfully!");
  };

  const handleLogout = () => {
    // Clear token and redirect to login (you can customize this as needed)
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <div className="p-6 bg-[#7A1CAC] min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#EBD3F8]">CheckTitles</h1>
        <div className="flex items-center space-x-4">
          {/* Full Add Title Button */}
          <button
            onClick={handleAddTitleClick}
            className="hidden md:flex items-center bg-[#AD49E1] text-[#2E073F] py-2 px-4 rounded-lg hover:bg-[#EBD3F8] transition duration-300"
          >
            <AiOutlinePlus className="mr-2 text-lg" /> {/* Add Title Icon */}
            Add Title
          </button>

          {/* Icon for Add Title Button on smaller screens */}
          <button
            onClick={handleAddTitleClick}
            className="flex md:hidden items-center bg-[#AD49E1] text-[#2E073F] p-2 rounded-full hover:bg-[#EBD3F8] transition duration-300"
          >
            <AiOutlinePlus className="text-lg" /> {/* Add Title Icon */}
          </button>

          {/* Full Logout Button */}
          <button
            onClick={handleLogout}
            className="hidden md:flex items-center bg-[#AD49E1] text-[#2E073F] py-2 px-4 rounded-lg hover:bg-[#EBD3F8] transition duration-300"
          >
            <FiLogOut className="mr-2 text-lg" /> {/* Logout Icon */}
            Logout
          </button>

          {/* Icon for Logout Button on smaller screens */}
          <button
            onClick={handleLogout}
            className="flex md:hidden items-center bg-[#AD49E1] text-[#2E073F] p-2 rounded-full hover:bg-[#EBD3F8] transition duration-300"
          >
            <FiLogOut className="text-lg" /> {/* Logout Icon */}
          </button>
        </div>
      </div>

      {/* Centered Connect Wallet Button */}
      <div className="flex justify-center mt-4">
        <MetaMaskIntegration onWalletConnected={handleWalletConnected} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          titles &&
          titles.map((title) => (
            <div
              key={title.uuid}
              className="relative bg-[#2E073F] p-4 rounded-lg hover:shadow-lg transition-shadow duration-300 flex items-center justify-between"
            >
              <h2 className="text-lg text-[#EBD3F8]">{title.title}</h2>
              <button
                onClick={() => handleDeleteTitle(title.uuid)}
                className="absolute top-4 right-2 text-red-500 hover:opacity-80 transition-opacity duration-300"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTitle}
      >
        <SharedInput
          label="Title"
          type="text"
          value={newTitle}
          onChange={(e) => {
            setNewTitle(e.target.value);
            setErrors((prev) => ({ ...prev, title: undefined }));
          }}
          placeholder="Enter title"
          error={errors.title}
        />
        <button
          type="submit"
          className="mt-4 w-full py-2 bg-[#AD49E1] text-[#2E073F] font-bold rounded-lg hover:bg-[#EBD3F8] transition duration-300"
        >
          Add Title
        </button>
      </Modal>
    </div>
  );
};

export default Dashboard;
