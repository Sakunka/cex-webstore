import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import uploadImage from "../uploadImage";

export function createGenericController(Model: any, entityName = "item") {
  return {
    async getAll(request: any) {
      try {
        await connectDB();

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const { searchParams } = new URL(request.url, baseUrl);

        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const skip = (page - 1) * limit;

        const filter = {};
        const excludedParams = ["page", "limit", "min", "max"];

        for (const [key, value] of searchParams.entries()) {
          if (excludedParams.includes(key)) continue;
          if (value) filter[key] = value;
        }

        const minPrice = searchParams.get("min");
        const maxPrice = searchParams.get("max");

        if (minPrice || maxPrice) {
          filter.price = {};
          if (minPrice) filter.price.$gte = parseFloat(minPrice);
          if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
        }

        const total = await Model.countDocuments(filter);

        const items = await Model.find(filter)
          .sort({ _id: 1 })
          .skip(skip)
          .limit(limit);

        const responseData = {
          total,
          items,
          curPage: page,
          totalPage: Math.ceil(total / limit),
        };

        return NextResponse.json({
          message: `Successfully retrieved ${entityName}s`,
          data: responseData,
        });
      } catch (error) {
        return NextResponse.json(
          {
            message: `Failed to retrieve ${entityName}s`,
            error: error.message,
          },
          { status: 400 }
        );
      }
    },

    async getById(request: NextRequest, { params }) {
      try {
        await connectDB();
        const newParams = await params;
        const id = newParams.id;
        const item = await Model.findById(id);

        if (!item) {
          return NextResponse.json(
            { message: `${entityName} not found` },
            { status: 404 }
          );
        }

        return NextResponse.json({
          message: `Found ${entityName}`,
          data: item,
        });
      } catch (error) {
        return NextResponse.json(
          { message: `Could not find this ${entityName}` },
          { status: 400 }
        );
      }
    },

    async create(request: NextRequest) {
      try {
        await connectDB();

        const formData = await request.formData();

        const itemData = {};
        let imageFile = null;

        for (const [key, value] of formData.entries()) {
          if (value instanceof File) {
            imageFile = value;
          } else {
            if (key === "price" || key === "stock") {
              itemData[key] = parseFloat(value) || 0;
            } else {
              itemData[key] = value;
            }
          }
        }

        let imageUrl = null;
        if (imageFile) {
          try {
            imageUrl = await uploadImage(
              imageFile,
              itemData.name || "item",
              entityName
            );
          } catch (uploadError) {
            throw uploadError;
          }
        }
        const finalItemData = {
          ...itemData,
          image: imageUrl,
        };

        const newItem = await Model.create(finalItemData);

        return NextResponse.json(
          {
            message: `Successfully created ${entityName}`,
            data: newItem,
            imageUploaded: imageUrl ? true : false,
          },
          { status: 201 }
        );
      } catch (error) {
        return NextResponse.json(
          { message: `Error creating ${entityName}`, error: error.message },
          { status: 400 }
        );
      }
    },

    async update(request, { params }) {
      try {
        await connectDB();
        const body = await request.json();

        const updatedItem = await Model.findByIdAndUpdate(params.id, body, {
          new: true,
          runValidators: true,
        });

        if (!updatedItem) {
          return NextResponse.json(
            { message: `${entityName} not found` },
            { status: 404 }
          );
        }

        return NextResponse.json({
          message: `Successfully updated ${entityName}`,
          data: updatedItem,
        });
      } catch (error) {
        return NextResponse.json(
          { message: `Failed to update ${entityName}`, error: error.message },
          { status: 400 }
        );
      }
    },

    async delete(request, { params }) {
      try {
        await connectDB();
        const deletedItem = await Model.findByIdAndDelete(params.id);

        if (!deletedItem) {
          return NextResponse.json(
            { message: `${entityName} not found` },
            { status: 404 }
          );
        }

        return NextResponse.json({
          message: `Successfully deleted ${entityName}`,
        });
      } catch (error) {
        return NextResponse.json(
          { message: `Failed to delete ${entityName}`, error: error.message },
          { status: 400 }
        );
      }
    },

    async getFilters(request) {
      try {
        await connectDB();
        const schema = Model.schema;
        const schemaKeys = Object.keys(schema.paths);

        const filterableKeys = schemaKeys.filter(
          (key) =>
            ![
              "_id",
              "__v",
              "createdAt",
              "updatedAt",
              "description",
              "image",
              "name",
              "count",
            ].includes(key)
        );

        const filtersData = {};

        for (const key of filterableKeys) {
          const schemaType = schema.paths[key];
          const fieldType = schemaType.instance;

          const fieldInfo = { type: fieldType };

          if (["String", "Number"].includes(fieldType)) {
            try {
              const distinctValues = await Model.distinct(key);
              fieldInfo.availableValues = distinctValues
                .filter((value) => value !== null && value !== "")
                .sort();
            } catch (error) {
              fieldInfo.availableValues = [];
            }
          }

          filtersData[key] = fieldInfo;
        }

        return NextResponse.json({
          message: `Successfully retrieved ${entityName} filters`,
          data: filtersData,
        });
      } catch (error) {
        return NextResponse.json(
          {
            message: `Failed to get ${entityName} filters`,
            error: error.message,
          },
          { status: 400 }
        );
      }
    },

    async getLatest(request) {
      try {
        await connectDB();

        const items = await Model.find().sort({ createdAt: -1 }).limit(6);

        return NextResponse.json({
          message: `Successfully retrieved ${entityName}s`,
          data: {
            items,
          },
        });
      } catch (error) {
        return NextResponse.json(
          {
            message: `Failed to retrieve ${entityName}s`,
            error: error.message,
          },
          { status: 400 }
        );
      }
    },
  };
}
