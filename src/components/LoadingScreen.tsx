import { motion } from "motion/react";

export function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-gradient-to-br from-black via-purple-950/70 to-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-12">
        {/* J & B Logo */}
        <motion.div
          className="flex flex-row items-center justify-center gap-12"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <div
            className="text-9xl italic"
            style={{
              background: "linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: "700",
              letterSpacing: "0.1em",
            }}
          >
            J
          </div>
          <div className="h-24 w-0.5" style={{
            background: "linear-gradient(to bottom, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)"
          }}></div>
          <div
            className="text-9xl italic"
            style={{
              background: "linear-gradient(135deg, #DC2626 0%, #9333EA 40%, #7C3AED 60%, #60A5FA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: "700",
              letterSpacing: "0.1em",
            }}
          >
            B
          </div>
        </motion.div>

        {/* Animated Ellipsis Loading Dots */}
        <motion.div
          className="flex gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 rounded-full"
              style={{
                background: index === 0 ? '#DC2626' : index === 1 ? '#7C3AED' : '#60A5FA'
              }}
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.8, 1.3, 0.8],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Ambient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/15 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl"></div>
    </motion.div>
  );
}
