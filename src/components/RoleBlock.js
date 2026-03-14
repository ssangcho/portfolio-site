import { motion } from 'framer-motion';
import './RoleBlock.css';

const fields = [
  { key: 'role',  label: 'Role' },
  { key: 'scope', label: 'Scope' },
  { key: 'tools', label: 'Tools' },
  { key: 'type',  label: 'Type' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function RoleBlock({ data }) {
  return (
    <motion.section
      className="role-block"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={containerVariants}
    >
      {fields.map(({ key, label }) =>
        data[key] ? (
          <motion.div className="role-field" key={key} variants={fieldVariants}>
            <span className="role-label">{label}</span>
            <span className="role-value">{data[key]}</span>
          </motion.div>
        ) : null
      )}
    </motion.section>
  );
}

export default RoleBlock;
