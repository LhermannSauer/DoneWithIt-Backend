const categories = [
  {
    name: "Cars",
    icon: "car",
    backgroundColor: "#fd9644",
    color: "white",
  },
  {
    name: "Cameras",
    icon: "camera",
    backgroundColor: "#fed330",
    color: "white",
  },
  {
    name: "Games",
    icon: "cards",
    backgroundColor: "#26de81",
    color: "white",
  },
  {
    name: "Clothing",
    icon: "shoe-heel",
    backgroundColor: "#2bcbba",
    color: "white",
  },
  {
    name: "Sports",
    icon: "basketball",
    backgroundColor: "#45aaf2",
    color: "white",
  },
  {
    name: "Movies & Music",
    icon: "headphones",
    backgroundColor: "#4b7bec",
    color: "white",
  },
  {
    name: "Books",
    icon: "book-open-variant",
    backgroundColor: "#a55eea",
    color: "white",
  },
  {
    name: "Other",
    icon: "application",
    backgroundColor: "#778ca3",
    color: "white",
  },
];

const getCategories = () => categories;

const getCategory = (id) => categories.find((c) => c.id === id);

module.exports = {
  getCategories,
  getCategory,
};
