import { z } from "zod";

export const productSchema = z.object({
    // El nombre debe ser un string no vacío y tener al menos 3 caracteres
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),

    // El SKU debe ser un string no vacío
    sku: z.string().min(1, "El SKU no puede estar vacío."),

    // La cantidad debe ser un número entero mayor o igual a cero
    quantity: z.number().int("La cantidad debe ser un número entero.").min(0, "La cantidad no puede ser negativa."),

    // El precio debe ser un número mayor a cero
    price: z.number().min(0.01, "El precio debe ser mayor a cero."),

    // La descripción es opcional, pero si existe, debe ser un string
    description: z.string().optional(),

    // La categoría es un string opcional
    category: z.string().optional(),
});