import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod'

const loginSchema = z.object({
    email: z.string().email('Email is required'),
    password: z.string().min(8, 'Password is required')
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const { signIn } = useAuth()
    const navigate = useNavigate()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        try {
            await signIn(data.email, data.password)
            toast.success('Connexion réussie')
            navigate('/')
        } catch (error) {
            toast.error('Echec de la connexion')
        } finally {
            {
                setIsLoading(false);
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Connexion</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Bienvenue sur notre plateforme
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
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
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
                            <input
                                id="password"
                                type="password"
                                {...register('password')}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md  shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            {errors.password && (
                                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                            )}
                        </div>
                    </div>


                    <div className="text-sm">
                        <Link to="/forgt-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                    </button>
                </form>

                <div className="text-center">
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Pas encore de compte ? S'inscrire
                    </Link>
                </div>
            </div>
        </div>
    )
}