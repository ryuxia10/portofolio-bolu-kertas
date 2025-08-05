interface SkillChipProps {
  skill: string;
  color: string;
}

const SkillChip = ({ skill, color }: SkillChipProps) => {
  return (
    <div 
      className={`text-base md:text-lg font-bold text-gray-800 py-2 px-5 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:scale-110 hover:-rotate-3 cursor-pointer ${color}`}
    >
      {skill}
    </div>
  );
};

export default SkillChip;