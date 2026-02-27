import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import nodemailer from 'nodemailer';

// Email transporter configuration
const createTransporter = () => {
    return nodemailer.createTransporter({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
};

// Send order confirmation email
const sendOrderConfirmation = async (userEmail, orderDetails) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: '🎁 Order Confirmation - Gift Delivery System',
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
                        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                        .content { padding: 30px; }
                        .order-details { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                        .footer { background: #333; color: white; padding: 20px; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎁 Welcome to Gift Delivery System</h1>
                            <p>Thank you for choosing us for your special moments!</p>
                        </div>
                        <div class="content">
                            <h2>Order Confirmation ✅</h2>
                            <p>Dear Valued Customer,</p>
                            <p>We're excited to confirm that your order has been successfully placed!</p>
                            
                            <div class="order-details">
                                <h3>📋 Order Details:</h3>
                                <p><strong>Order ID:</strong> ${orderDetails._id}</p>
                                <p><strong>Amount:</strong> ₹${orderDetails.amount}</p>
                                <p><strong>Status:</strong> <span style="color: #28a745; font-weight: bold;">${orderDetails.status}</span></p>
                                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-IN')}</p>
                            </div>
                            
                            <p>🚚 We will process your order shortly and keep you updated on the delivery status.</p>
                            <p>💝 Your gifts will be delivered with love and care!</p>
                        </div>
                        <div class="footer">
                            <p><strong>Gift Delivery System</strong></p>
                            <p>Making every moment special! 🎉</p>
                            <p>📧 Contact us: ${process.env.EMAIL_USER}</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Email sending error:', error);
    }
};

// Send status update email
const sendStatusUpdate = async (userEmail, orderId, newStatus) => {
    try {
        const transporter = createTransporter();
        
        const statusEmoji = {
            'Order Placed': '📋',
            'Processing': '⚙️',
            'Out for Delivery': '🚚',
            'Delivered': '✅'
        };
        
        const mailOptions = {
            from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_USER}>`,
            to: userEmail,
            subject: `${statusEmoji[newStatus] || '🔄'} Order Status Update - Gift Delivery System`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
                        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
                        .content { padding: 30px; }
                        .status-update { background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745; }
                        .footer { background: #333; color: white; padding: 20px; text-align: center; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🎁 Gift Delivery System</h1>
                            <p>Your trusted partner for special deliveries!</p>
                        </div>
                        <div class="content">
                            <h2>Order Status Update ${statusEmoji[newStatus] || '🔄'}</h2>
                            <p>Dear Valued Customer,</p>
                            <p>We have an exciting update about your order!</p>
                            
                            <div class="status-update">
                                <h3>🔄 Status Update:</h3>
                                <p><strong>Order ID:</strong> ${orderId}</p>
                                <p><strong>New Status:</strong> <span style="color: #28a745; font-weight: bold; font-size: 18px;">${newStatus} ${statusEmoji[newStatus] || ''}</span></p>
                                <p><strong>Updated On:</strong> ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}</p>
                            </div>
                            
                            ${newStatus === 'Delivered' ? 
                                '<p>🎉 <strong>Congratulations!</strong> Your gift has been successfully delivered! We hope it brings joy to your special someone.</p>' : 
                                '<p>🚀 Your order is progressing smoothly. We\'ll keep you updated on any further changes.</p>'
                            }
                            
                            <p>Thank you for choosing Gift Delivery System! 💝</p>
                        </div>
                        <div class="footer">
                            <p><strong>Gift Delivery System</strong></p>
                            <p>Making every moment special! 🎉</p>
                            <p>📧 Contact us: ${process.env.EMAIL_USER}</p>
                        </div>
                    </div>
                </body>
                </html>
            `
        };
        
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log('Email sending error:', error);
    }
};

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
        
        // Get user email for confirmation
        const user = await userModel.findById(req.body.userId);
        
        // Send email first, then respond
        if (user && user.email) {
            await sendOrderConfirmation(user.email, newOrder);
        }
        
        res.json({ success: true, message: "Order Placed & Email Sent" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

const updateStatus = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status }, { new: true });
        
        // Get user email for status update notification
        const user = await userModel.findById(order.userId);
        
        // Send email first, then respond
        if (user && user.email) {
            await sendStatusUpdate(user.email, order._id, req.body.status);
        }
        
        res.json({ success: true, message: "Status Updated & Email Sent" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { placeOrder, userOrders, listOrders, updateStatus };
