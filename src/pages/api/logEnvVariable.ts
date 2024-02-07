export default function handler(req, res) {
  // Récupérez la valeur de votre variable d'environnement
  const envVariableValue = process.env.SUPABASE_ANON_KEY;

  // Enregistrez la valeur dans vos journaux côté serveur

  // Répondez à la requête avec un message approprié
  res.status(200).json({ message: envVariableValue });
}
