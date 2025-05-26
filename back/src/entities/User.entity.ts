import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, JoinColumn } from "typeorm";
import { Credential } from "./Credential.Entity";
import { join } from "path";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "varchar", length: 100, nullable: false })
    name: string
    @Column({ type: "varchar", length: 100, nullable: false, unique: true })
    email: string
    @Column({ type: "date", nullable: false })
    birthdate: Date
    @Column({ type: "integer", nullable: false, unique: true })
    nDni: number

    @OneToOne(() => Credential, { eager: true, cascade: true })
    @JoinColumn()
    credentials: Credential

    @CreateDateColumn({ type: "timestamp" })
    createdAt?: Date
    @UpdateDateColumn({ type: "timestamp" })
    updatedAt?: Date
 
}   
 


