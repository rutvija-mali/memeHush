function GlitchText({ text }) {
  return (
    <h1 className="text-4xl text-center glitch text-neon-pink" data-text={text}>
      {text}
    </h1>
  );
}

export default GlitchText;