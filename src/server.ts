// Library imports
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';

// File imports
import authRoutes from './routes/auth.routes';
import Database from './db';

class Server {
	private app: express.Application;
	private httpServer: HttpServer;
	public io: SocketIOServer;

	constructor() {
		this.app = express();
		this.httpServer = createServer(this.app);
		this.io = new SocketIOServer(this.httpServer, {
			cors: {
				origin: 'http://localhost:4200', // Adjust this to your Angular app's URL
				methods: ['GET', 'POST'],
				allowedHeaders: ['my-custom-header'],
				credentials: true, // Optional. You might need this if you're sending cookies or other credentials
			},
		});

		this.config();
		this.routerConfig();
		this.databaseConfig();
	}

	public getIo(): SocketIOServer {
		return this.io;
	}
	// Configuration
	private config() {
		this.app.use(morgan('dev'));
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use(bodyParser.json({ limit: '1mb' })); // 100kb default
		this.app.use(
			cors({
				origin: '*',
			})
		);
	}

	// Routes
	private routerConfig() {
		this.app.use('/api/v1/auth', authRoutes);
	}

	// Database
	private databaseConfig() {
		const db = new Database();
		db.connect();
	}

	public start = (port: number) => {
		return new Promise((resolve, reject) => {
			this.httpServer
				.listen(port, () => {
					resolve(port);
				})
				.on('error', (err: object) => reject(err));
		});
	};
}
export default Server;
