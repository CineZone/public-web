import toast from "react-hot-toast";

const notify = {
  success: (message: string) => {
    toast(message, {
      icon: "🚀",
      style: {
        borderRadius: "5px",
        background: "#333",
        color: "#fff",
      },
    });
  },
  error: (message: string) => {
    toast(message, {
      icon: "😨",
      style: {
        borderRadius: "5px",
        background: "red",
        color: "#fff",
      },
    });
  },
};

export default notify;
