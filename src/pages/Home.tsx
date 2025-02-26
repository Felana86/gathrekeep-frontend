import {useAuth} from "../contexts/AuthContext.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {useState} from "react";

const authSchema = z.object({
    email: z.string().email('Email invalide'),
    password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractère'),
    role: z.enum(['HABITANT', 'ASSOCIATION'])
});

type AuthFormData = z.infer<typeof authSchema>;

export default function Home() {
    const [isLogin, setIsLogin] = useState(true);
    const { signIn, signUp} = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<AuthFormData>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            role: 'HABITANT'
        }
    });
    const onSubmit = async (data: AuthFormData) => {
        try {
            if (isLogin) {
                await signIn(data.email, data.password);
                toast.success('Connexion réussie');
            } else {
                await signUp(data.email, data.password);
                toast.success('Inscription réussie');
            }
        } catch (error) {
            toast.error(isLogin ? 'Echec de la connexion' : 'Echec de l\'inscription');
        }
    };

    return (
        <>
            <div
                className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">
                            {isLogin ? 'Connexion' : 'Inscription'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {isLogin ? 'Bienvenue sur notre platefrome' : 'Rejoignez notre communauté'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email')}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Mot de passe
                                </label>
                                <input
                                    id="password"
                                    type="paasword"
                                    {...register('password')}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            {!isLogin && (
                                <div>
                                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                        Rôle
                                    </label>
                                    <select
                                        id="role"
                                        { ...register('role') }
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        <option value="HABITANT">Habitant</option>
                                        <option value="ASSOCIATION">association</option>
                                    </select>
                                </div>
                            ) }
                        </div>

                        {isLogin && (
                            <div className="text-sm">
                                <a href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Mot de passe oublié ?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {isLogin ? 'Se connecter' : 'S\'inscrire'}
                        </button>
                    </form>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                            {isLogin ? 'Pas encore de compte ? S\'inscrire' : 'Déjà un compte ? Se connecter'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}