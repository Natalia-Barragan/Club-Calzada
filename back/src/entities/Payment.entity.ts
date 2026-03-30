import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "./User.entity";

@Entity("payments")
export class Payment {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount: number

    @Column({ type: "varchar", length: 100 })
    concept: string // e.g. "Cuota Social"

    @Column({ type: "varchar", length: 50 })
    month: string // e.g. "Marzo 2026"

    @CreateDateColumn({ type: "timestamp" })
    paymentDate: Date

    @ManyToOne(() => User, (user) => user.payments)
    user: User
}
