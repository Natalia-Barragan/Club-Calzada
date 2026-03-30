import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn, OneToMany } from "typeorm";
import { Credential } from "./Credential.entity";
import { Appointment } from "./Appointment.entity";
import { Payment } from "./Payment.entity";


@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "varchar", length: 100, nullable: false })
    name: string
    @Column({ type: "varchar", length: 100, nullable: true })
    lastName: string
    @Column({ type: "varchar", length: 100, nullable: false, unique: true })
    email: string
    @Column({ type: "date", nullable: false })
    birthdate: Date
    @Column({ type: "integer", nullable: false, unique: true })
    nDni: number
    @Column({ type: "varchar", nullable: true })
    memberNumber: string
    @Column({ type: "text", nullable: true })
    photoUrl: string

    @Column({ type: "varchar", length: 20, default: "user" }) /* New Field */
    role: string

    @Column({ type: "boolean", default: true })
    active: boolean

    @OneToOne(() => Credential, { eager: true, cascade: true })
    @JoinColumn()
    credentials: Credential

    @OneToMany(() => Appointment, (appointment) => appointment.user)
    appointments: Appointment[]

    @OneToMany(() => Payment, (payment) => payment.user)
    payments: Payment[]

    @CreateDateColumn({ type: "timestamp" })
    createdAt?: Date
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt?: Date

}



