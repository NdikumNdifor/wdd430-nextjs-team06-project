"use client";

import { useState } from "react";

/*Function areas */
// defining a function at the same time I am market as a exportable function.
export default function ProductUpload() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
  });

  const [images, setImages] = useState<File[]>([]);

  //handle the input text
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };   


  //handle images
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files));
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", product.title);
  formData.append("description", product.description);
  formData.append("price", product.price);

  // only the firts image for the moment
  if (images[0]) {
    formData.append("image", images[0]);
  }

  const res = await fetch("/api/products", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  console.log(data);
};



  return (
    <>
      <h1>Product Upload</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Product Title</label>
        <br />
        <input
          type="text"
          name="title"
          placeholder="Product title"
          value={product.title}
          onChange={handleChange}
        />

        <br />
        <br />
        
        <label htmlFor="description">Description</label>
        <br/>
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <label htmlFor="price">Price</label>
        <br />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
        />

        <br />
        <br />

        <input type="file" multiple onChange={handleImages} />

        <br />
        <br />

        <button type="submit">Submit Product</button>
      </form>
    </>
  );
}


/**
 * NOTES
 * React always start the components with Uper case
 * React always need a return componentss
 * useState let add a state variable to your components
 * handleChange  updating an input to something other than e.target.value.
 * in TSX is necessarry to define  type in a formylary if not you will have an error
 * if you not defined it can occur more silence errors.
 */
