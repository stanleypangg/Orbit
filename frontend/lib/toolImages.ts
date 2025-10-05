/**
 * Tool and Material Image Mapping
 * Maps tool/material names to image URLs or emoji representations
 */

export interface ToolImageMapping {
  [key: string]: {
    image?: string; // URL or path to image
    emoji?: string; // Emoji fallback
    color?: string; // Color theme for the item
  };
}

// Map of common tools and materials to visual representations
export const toolImageMap: ToolImageMapping = {
  // Tools
  "heat gun": {
    emoji: "🔫",
    color: "#5BA3D0",
  },
  "wire cutters": {
    emoji: "✂️",
    color: "#67B68B",
  },
  "pliers": {
    emoji: "🔧",
    color: "#67B68B",
  },
  "scissors": {
    emoji: "✂️",
    color: "#67B68B",
  },
  "glue gun": {
    emoji: "🔫",
    color: "#67B68B",
  },
  "hot glue gun": {
    emoji: "🔫",
    color: "#67B68B",
  },
  "drill": {
    emoji: "🔩",
    color: "#67B68B",
  },
  "hammer": {
    emoji: "🔨",
    color: "#67B68B",
  },
  "saw": {
    emoji: "🪚",
    color: "#67B68B",
  },
  "knife": {
    emoji: "🔪",
    color: "#67B68B",
  },
  "craft knife": {
    emoji: "🔪",
    color: "#67B68B",
  },
  "ruler": {
    emoji: "📏",
    color: "#67B68B",
  },
  "measuring tape": {
    emoji: "📏",
    color: "#67B68B",
  },
  "sandpaper": {
    emoji: "📄",
    color: "#67B68B",
  },
  "paintbrush": {
    emoji: "🖌️",
    color: "#67B68B",
  },
  "brush": {
    emoji: "🖌️",
    color: "#67B68B",
  },
  
  // Materials
  "jewelry wire": {
    emoji: "🧵",
    color: "#5BA3D0",
  },
  "wire": {
    emoji: "🧵",
    color: "#5BA3D0",
  },
  "string": {
    emoji: "🧵",
    color: "#5BA3D0",
  },
  "thread": {
    emoji: "🧵",
    color: "#5BA3D0",
  },
  "rope": {
    emoji: "🪢",
    color: "#5BA3D0",
  },
  "silver hooks": {
    emoji: "📎",
    color: "#5BA3D0",
  },
  "hooks": {
    emoji: "📎",
    color: "#5BA3D0",
  },
  "glue": {
    emoji: "🧴",
    color: "#5BA3D0",
  },
  "adhesive": {
    emoji: "🧴",
    color: "#5BA3D0",
  },
  "paint": {
    emoji: "🎨",
    color: "#5BA3D0",
  },
  "acrylic paint": {
    emoji: "🎨",
    color: "#5BA3D0",
  },
  "spray paint": {
    emoji: "🎨",
    color: "#5BA3D0",
  },
  "fabric": {
    emoji: "🧵",
    color: "#5BA3D0",
  },
  "cloth": {
    emoji: "🧵",
    color: "#5BA3D0",
  },
  "plastic": {
    emoji: "♻️",
    color: "#5BA3D0",
  },
  "ocean plastic": {
    emoji: "🌊",
    color: "#5BA3D0",
  },
  "recycled plastic": {
    emoji: "♻️",
    color: "#5BA3D0",
  },
  "glass": {
    emoji: "🫙",
    color: "#5BA3D0",
  },
  "bottle": {
    emoji: "🍾",
    color: "#5BA3D0",
  },
  "glass bottle": {
    emoji: "🍾",
    color: "#5BA3D0",
  },
  "metal": {
    emoji: "⚙️",
    color: "#5BA3D0",
  },
  "aluminum": {
    emoji: "⚙️",
    color: "#5BA3D0",
  },
  "cardboard": {
    emoji: "📦",
    color: "#5BA3D0",
  },
  "paper": {
    emoji: "📄",
    color: "#5BA3D0",
  },
  "wood": {
    emoji: "🪵",
    color: "#5BA3D0",
  },
  "wooden board": {
    emoji: "🪵",
    color: "#5BA3D0",
  },
  "beads": {
    emoji: "📿",
    color: "#5BA3D0",
  },
  "buttons": {
    emoji: "🔘",
    color: "#5BA3D0",
  },
  "screws": {
    emoji: "🔩",
    color: "#5BA3D0",
  },
  "nails": {
    emoji: "🔩",
    color: "#5BA3D0",
  },
  "tape": {
    emoji: "📏",
    color: "#5BA3D0",
  },
  "duct tape": {
    emoji: "📏",
    color: "#5BA3D0",
  },
};

/**
 * Get visual representation for a tool or material
 * @param name - Name of the tool/material
 * @param category - Whether it's a tool or material
 * @returns Object with image URL or emoji
 */
export function getToolImage(name: string, category: "tool" | "material") {
  const nameLower = name.toLowerCase();
  
  // Try exact match first
  if (toolImageMap[nameLower]) {
    return toolImageMap[nameLower];
  }
  
  // Try partial matches
  for (const key in toolImageMap) {
    if (nameLower.includes(key) || key.includes(nameLower)) {
      return toolImageMap[key];
    }
  }
  
  // Default fallbacks
  return {
    emoji: category === "tool" ? "🔧" : "📦",
    color: category === "tool" ? "#67B68B" : "#5BA3D0",
  };
}

