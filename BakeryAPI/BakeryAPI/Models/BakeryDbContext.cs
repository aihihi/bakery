using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using BakeryAPI.Models;

namespace BakeryAPI.Models
{
    public partial class BakeryDbContext : DbContext
    {
        public BakeryDbContext()
        {
        }

        public BakeryDbContext(DbContextOptions<BakeryDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<EmployeeOfStore> EmployeeOfStore { get; set; }
        public virtual DbSet<Employees> Employees { get; set; }
        public virtual DbSet<Stores> Stores { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-HAV5U60;Database=BakeryDb;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeOfStore>(entity =>
            {
                entity.HasKey(e => new { e.StoreId, e.EmployeeId });

                entity.ToTable("employeeOfStore");

                entity.Property(e => e.StoreId).HasColumnName("storeId");

                entity.Property(e => e.EmployeeId).HasColumnName("employeeId");
            });

            modelBuilder.Entity<Employees>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address).HasColumnName("address");

                entity.Property(e => e.Birthday)
                    .HasColumnName("birthday")
                    .HasColumnType("date");

                entity.Property(e => e.JoinedDate)
                    .HasColumnName("joinedDate")
                    .HasColumnType("date");

                entity.Property(e => e.MobilePhone)
                    .HasColumnName("mobilePhone")
                    .HasMaxLength(50);

                entity.Property(e => e.FullName).HasColumnName("fullName");

                entity.Property(e => e.Note).HasColumnName("note");
            });

            modelBuilder.Entity<Stores>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.Address).HasColumnName("address");

                entity.Property(e => e.FirstOpenedDate)
                    .HasColumnName("firstOpenedDate")
                    .HasColumnType("date");

                entity.Property(e => e.Name).HasColumnName("name");

                entity.Property(e => e.StoreLeader).HasColumnName("storeLeader");

                entity.Property(e => e.StoreLeader2).HasColumnName("storeLeader2");

                entity.Property(e => e.Note).HasColumnName("note");
            });

            modelBuilder.Entity<WorkingDay>(entity =>
            {
                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .ValueGeneratedNever();

                entity.Property(e => e.EmployeeId).HasColumnName("employeeId");

                entity.Property(e => e.EndTime)
                    .HasColumnName("endTime")
                    .HasColumnType("datetime");

                entity.Property(e => e.StartTime)
                    .HasColumnName("startTime")
                    .HasColumnType("datetime");

                entity.Property(e => e.StoreId).HasColumnName("storeId");

                entity.Property(e => e.Note).HasColumnName("note");

            });
        }

        public DbSet<BakeryAPI.Models.WorkingDay> WorkingDay { get; set; }
    }
}
