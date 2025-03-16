"use client";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Terminal, Home, RefreshCcw } from 'lucide-react';


export default function NotFound() {
  const router = useRouter();

  // Animation variants for code lines
  const codeLineVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
      },
    }),
  };

  // Mock code lines for the animation
  const codeLines = [
    '// ERROR 404',
    'try {',
    '  findPage(requested_url);',
    '} catch (error) {',
    '  return "Page Not Found";',
    '}',
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Main content container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {/* Terminal-like window */}
          <div className="bg-card rounded-lg shadow-xl overflow-hidden border border-input">
            {/* Terminal header */}
            <div className="bg-muted p-4 flex items-center space-x-2 border-b border-input">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-orange-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm font-mono text-muted-foreground">
                404.js
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-6 font-mono">
              {codeLines.map((line, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={codeLineVariants}
                  initial="initial"
                  animate="animate"
                  className="text-foreground/90 my-2"
                >
                  {line}
                </motion.div>
              ))}

              {/* Error message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-8 p-4 bg-destructive/10 rounded-md border border-destructive/20"
              >
                <div className="flex items-center mb-2">
                  <Terminal className="w-5 h-5 text-destructive mr-2" />
                  <span className="text-destructive font-semibold">
                    Compilation Error
                  </span>
                </div>
                <p className="text-destructive/90">
                  The page you&apos;re looking for seems to have a syntax error or
                  doesn&apos;t exist in the current workspace.
                </p>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.push('/')}
                  className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => router.back()}
                  className="flex items-center px-4 py-2 border border-input bg-background text-foreground rounded-md hover:bg-muted"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Go Back
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0.1, top: -10 }}
                  animate={{
                    top: "100%",
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 2.5,
                    delay: i * 0.8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-px bg-primary/20 h-20"
                  style={{ left: `${i * 25}%` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

