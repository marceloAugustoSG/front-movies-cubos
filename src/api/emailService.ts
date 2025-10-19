import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { API_CONFIG } from './config';

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text: string;
}

interface EmailResponse {
  message: string;
  success: boolean;
}

class EmailService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  async sendEmail(emailData: EmailRequest): Promise<EmailResponse> {
    try {
      const response: AxiosResponse<EmailResponse> = await this.api.post(
        '/email/send',
        emailData
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string } } };
        throw new Error(axiosError.response?.data?.message || 'Erro ao enviar email');
      } else if (error && typeof error === 'object' && 'request' in error) {
        throw new Error('Erro de conexão com a API');
      } else {
        throw new Error('Erro inesperado');
      }
    }
  }

  async sendMovieReminderEmail(
    userEmail: string,
    movieTitle: string,
    releaseDate: string,
    movieImage?: string
  ): Promise<EmailResponse> {
    const releaseDateFormatted = new Date(releaseDate).toLocaleDateString('pt-BR');
    
    const subject = `🎬 Lembrete: ${movieTitle} estreia hoje!`;
    
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lembrete de Estreia</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background-color: white;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .movie-title {
            font-size: 28px;
            font-weight: bold;
            color: #8E4EC6;
            margin-bottom: 10px;
          }
          .release-date {
            font-size: 18px;
            color: #666;
            margin-bottom: 20px;
          }
          .movie-image {
            max-width: 300px;
            width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 20px auto;
            display: block;
          }
          .message {
            font-size: 16px;
            margin-bottom: 30px;
            text-align: center;
          }
          .cta-button {
            display: inline-block;
            background-color: #8E4EC6;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            font-size: 14px;
            color: #666;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="movie-title">🎬 ${movieTitle}</h1>
            <p class="release-date">Estreia hoje - ${releaseDateFormatted}</p>
          </div>
          
          ${movieImage ? `<img src="${movieImage}" alt="${movieTitle}" class="movie-image">` : ''}
          
          <div class="message">
            <p>Olá!</p>
            <p>Hoje é o grande dia! <strong>${movieTitle}</strong> está estreando nos cinemas.</p>
            <p>Não perca a oportunidade de assistir a este filme que você adicionou à sua lista.</p>
          </div>
          
          <div style="text-align: center;">
            <a href="#" class="cta-button">Ver Detalhes do Filme</a>
          </div>
          
          <div class="footer">
            <p>Este é um lembrete automático do Cubos Movies.</p>
            <p>Se você não deseja receber mais lembretes, entre em contato conosco.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      🎬 Lembrete: ${movieTitle} estreia hoje!
      
      Olá!
      
      Hoje é o grande dia! ${movieTitle} está estreando nos cinemas.
      Não perca a oportunidade de assistir a este filme que você adicionou à sua lista.
      
      Data de estreia: ${releaseDateFormatted}
      
      Este é um lembrete automático do Cubos Movies.
      Se você não deseja receber mais lembretes, entre em contato conosco.
    `;

    return this.sendEmail({
      to: userEmail,
      subject,
      html,
      text,
    });
  }
}

export const emailService = new EmailService();
export type { EmailRequest, EmailResponse };
