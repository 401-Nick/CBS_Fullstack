import crypto from 'crypto';

const algorithm = 'aes-256-ctr';
const secretKey = Buffer.from(process.env.ENCRYPTION_KEY || '12345678901234567890123456789012', 'utf-8');

export const encrypt = (text: string) => {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        const encryptedText = Buffer.concat([cipher.update(text), cipher.final()]);
        const encrypted = iv.toString('hex') + ':' + encryptedText.toString('hex');
        console.log(`Encryption key: ${secretKey}`);
        console.log(`IV: ${iv.toString('hex')}`);
        console.log(`Encrypted text: ${encryptedText.toString('hex')}`);
        console.log(`Encrypted message: ${encrypted}`);
        return encrypted;
    } catch (error) {
        console.error(`Error encrypting text: ${error}`);
        throw error;
    }
};
