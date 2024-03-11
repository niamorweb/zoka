import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cp } from "fs";

const categories: string[] = ["Category 1", "Category 2", "Category 3"];

const items = [
  {
    id: 1,
    color: "red",
    category: "Category 1",
  },
  {
    id: 1,
    color: "red",
    category: "Category 1",
  },
  {
    id: 1,
    color: "red",
    category: "Category 1",
  },
  {
    id: 1,
    color: "red",
    category: "Category 2",
  },
  {
    id: 1,
    color: "red",
    category: "Category 2",
  },
  {
    id: 1,
    color: "red",
    category: "Category 2",
  },
  {
    id: 1,
    color: "red",
    category: "Category 3",
  },
];

export default function MyComponent() {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = () => {
    console.log(selectedValue);
  };

  return (
    <>
      {categories.map((category) => (
        <div key={category}>
          <p>{category}</p>
          <div className="grid grid-cols-4 gap-4">
            {items
              .filter((x) => x.category === category)
              .map((x) => (
                <Dialog key={x.id}>
                  <DialogTrigger>
                    <div className="h-[450px] bg-blue-500 w-full"></div>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit profile</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div>
                      <label htmlFor="selectBox">Choisir une option :</label>
                      <select
                        id="selectBox"
                        value={selectedValue}
                        onChange={handleChange}
                      >
                        <option value="">Aucune</option>
                        {categories.map((categoryOption) => (
                          <option value={categoryOption}>
                            {categoryOption}
                          </option>
                        ))}
                      </select>
                      <p>Vous avez sélectionné : {selectedValue}</p>
                    </div>
                    <DialogFooter>
                      <Button onClick={() => handleSubmit()} type="submit">
                        Save changes
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              ))}
          </div>
        </div>
      ))}
    </>
  );
}
